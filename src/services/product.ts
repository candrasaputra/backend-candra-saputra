import { DataSource, Repository, IsNull } from 'typeorm';
import { getProductRepository } from 'src/libs/typeorm/repositories';
import { IProductPayload } from './types';
import { randomUUID } from 'crypto';
import { Products } from 'src/domain/product';
import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';

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

        return {
            data: getProduct
        };
    }

    async createProduct(userId: string, payload: IProductPayload): Promise<any> {
        if (!payload.price) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'price required');
        }
        
        if (payload.price < 0) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'price should be more or equal to zero');
        }

        if (!payload.title) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'title required');
        }

        if (!payload.description) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'description required');
        }

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
            message: 'product created',
            data: [productObject]
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
            message: 'product deleted',
            data: [{
                id
            }]
        };
    }
}
