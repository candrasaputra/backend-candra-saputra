import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Transactions } from './transaction';
import { Products } from './product';

@Entity({ name: 'transaction_products' })
export class TransactionProducts {
    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id = '';

    @Column({ name: 'qty', type: 'decimal' })
    qty: number | undefined;

    @Column({ name: 'price', type: 'decimal' })
    price: number | undefined;

    @ManyToOne(() => Transactions, (transaction) => transaction.id)
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transactions | string | undefined;

    @ManyToOne(() => Products, (product) => product.id)
    @JoinColumn({ name: 'product_id' })
    product: Products | string | undefined;
}
