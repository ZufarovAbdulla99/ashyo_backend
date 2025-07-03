import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/modules/product/models/product.model';
import { User } from 'src/modules/user/models/user.model';

@Entity({ name: 'cart_item' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  product_id: number;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => User, (user) => user.cartItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}