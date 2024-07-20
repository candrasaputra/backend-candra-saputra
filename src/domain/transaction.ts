import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionProducts } from './transaction_product';
import { Users } from './user';

@Entity({ name: 'transactions' })
export class Transactions {
    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id = '';

    @Column({ name: 'address', type: 'text' })
    address: string | undefined;

    @Column({ name: 'status', type: 'text' })
    status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED' | undefined;

    @Column({ name: 'shipping_fee', type: 'decimal' })
    shippingFee: number | undefined;

    @Column({ name: 'discount', type: 'decimal' })
    discount: number | undefined;

    @Column({ name: 'total_payable', type: 'decimal' })
    totalPayable: number | undefined;

    @OneToMany(() => TransactionProducts, (tp) => tp.transaction)
    items?: TransactionProducts[] | undefined;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: Users | string | undefined;
}
