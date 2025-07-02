import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { UserRoles } from '../enums';
import { Address } from 'src/modules/address';
import { Like } from 'src/modules/like';
import { Comment } from 'src/modules/comment';
import { Order } from 'src/modules/order';
import { CartItem } from 'src/modules/cart_item';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  fullname: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.user,
  })
  role: UserRoles;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}
