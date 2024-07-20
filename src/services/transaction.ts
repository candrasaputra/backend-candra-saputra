import { DataSource, Repository, In } from 'typeorm';
import {
    getProductRepository,
    getTransactionProductRepository,
    getTransactionRepository,
    getUserRepository
} from 'src/libs/typeorm/repositories';
import { ICheckoutPayload } from './types';
import { randomUUID } from 'crypto';
import { Transactions } from 'src/domain/transaction';
import { Users } from 'src/domain/user';
import { Products } from 'src/domain/product';
import { TransactionProducts } from 'src/domain/transaction_product';

export class TransactionService {
    readonly userRepository: Repository<Users>;

    readonly transactionRepository: Repository<Transactions>;

    readonly productRepository: Repository<Products>;

    readonly transactionProductRepository: Repository<TransactionProducts>;

    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.userRepository = getUserRepository(this.dataSource);
        this.transactionRepository = getTransactionRepository(this.dataSource);
        this.productRepository = getProductRepository(this.dataSource);
        this.transactionProductRepository = getTransactionProductRepository(this.dataSource);
    }

    async getTransactions(): Promise<any> {
        const getTransactions = await this.transactionRepository.find({
            relations: ['user', 'items', 'items.product'],
            select: {
                user: {
                    id: true,
                    username: true
                },
                items: {
                    id: true,
                    qty: true,
                    price: true,
                    product: {
                        id: true,
                        title: true,
                        description: true
                    }
                }
            }
        });

        return {
            data: getTransactions
        };
    }

    async checkout(username: string, payloads: ICheckoutPayload[]): Promise<any> {
        const [getUser, getProducts] = await Promise.all([
            this.userRepository.findOne({
                where: {
                    username
                }
            }),

            this.productRepository.find({
                where: {
                    id: In(payloads.map((payload) => payload.product_id))
                }
            })
        ]);

        const transactionProduct: Array<TransactionProducts> = [];
        const transactionId = randomUUID();
        let total = 0;
        for (let i = 0; i < payloads.length; i++) {
            const { product_id: productId, qty } = payloads[i];
            const product = getProducts.find((p) => p.id === productId);

            const transactionProductObj: TransactionProducts = {
                id: randomUUID(),
                qty: qty,
                price: product?.price,
                transaction: transactionId,
                product: productId
            };

            total += qty * Number(product?.price);
            transactionProduct.push(transactionProductObj);
        }

        const shippingFee = total > 15000 ? 0 : 50000;
        const discount = total > 50000 ? (10 / 100) * total : 0;
        const transactionObject: Transactions = {
            id: transactionId,
            address: getUser?.address,
            status: 'PENDING',
            shippingFee: shippingFee,
            discount: discount,
            totalPayable: shippingFee + total - discount,
            user: getUser?.id
        };

        await this.transactionRepository
            .createQueryBuilder()
            .insert()
            .into(Transactions)
            .values(transactionObject)
            .orIgnore()
            .execute();

        await this.transactionProductRepository.insert(transactionProduct);

        return {
            message: 'transaction created',
            data: [transactionObject]
        };
    }
}
