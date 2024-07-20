import { UUID } from 'crypto';

export interface ServiceError<T> extends Error {
    type: T;
}

export enum ERole {
    MERCHANT = "MERCHANT",
    CUSTOMER = "CUSTOMER"
}

export interface IProductPayload {
    title: string;
    description: string;
    price: number;
}

export interface ICheckoutPayload {
    product_id: UUID;
    qty: number;
}

export interface IActiveUser {
    userId: UUID;
    username: string;
    role: ERole;
}