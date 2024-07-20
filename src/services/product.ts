import { DataSource, Repository, IsNull } from 'typeorm';
import { getProductRepository } from 'src/libs/typeorm/repositories';
import { IProductPayload } from './types';
import { randomUUID } from 'crypto';
import { Products } from 'src/domain/product';

export class ProductService {
    readonly productRepository: Repository<Products>;

    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.productRepository = getProductRepository(this.dataSource);
    }

    async getProducts(): Promise<any> {
        const getProduct = await this.productRepository.find({
            where: {
                deletedAt: IsNull()
            },
            select: ['id', 'title', 'description', 'price']
        });

        return getProduct;
    }

    async createProduct(userId: string, payload: IProductPayload): Promise<any> {
        const productObject: Products = {
            id: randomUUID(),
            title: payload.title,
            description: payload.description,
            price: Number(payload.price),
            user: userId
        };

        await this.productRepository
            .createQueryBuilder()
            .insert()
            .into(Products)
            .values(productObject)
            .orIgnore()
            .execute();

        return {
            message: 'product created'
        };
    }

    async deleteProduct(id: string): Promise<any> {
        await this.productRepository.update(
            {
                id
            },
            {
                deletedAt: new Date()
            }
        );

        return {
            message: 'product deleted'
        };
    }
}
