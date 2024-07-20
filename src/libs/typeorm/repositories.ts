import { DataSource, EntityManager } from 'typeorm';
import { Products } from '../../domain/product';
import { Transactions } from '../../domain/transaction';
import { TransactionProducts } from '../../domain/transaction_product';
import { Users } from '../../domain/user';

export function getProductRepository(dataSource: DataSource | EntityManager) {
    return dataSource.getRepository(Products).extend({});
}

export function getTransactionRepository(dataSource: DataSource | EntityManager) {
    return dataSource.getRepository(Transactions).extend({});
}

export function getTransactionProductRepository(dataSource: DataSource | EntityManager) {
    return dataSource.getRepository(TransactionProducts).extend({});
}

export function getUserRepository(dataSource: DataSource | EntityManager) {
    return dataSource.getRepository(Users).extend({});
}
