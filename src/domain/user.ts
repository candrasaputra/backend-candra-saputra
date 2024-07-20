import { ERole } from 'src/services/types';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
@Index(["username"], { unique: true })
export class Users {
    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id = '';

    @Column({ name: 'username', type: 'text' })
    username: string | undefined;

    @Column({ name: 'address', type: 'text' })
    address: string | undefined;

    @Column({ name: 'role', type: 'text' })
    role: ERole | undefined;
}
