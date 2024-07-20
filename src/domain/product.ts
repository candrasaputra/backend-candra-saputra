import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Users } from './user';

@Entity({ name: 'products' })
@Index(["deletedAt"], { unique: false })
export class Products {
    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id = '';

    @Column({ name: 'title', type: 'text' })
    title: string | undefined;

    @Column({ name: 'description', type: 'text' })
    description: string | undefined;

    @Column({ name: 'price', type: 'decimal' })
    price: number | undefined;

    @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date | null | undefined;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: Users | string | undefined;
}
