import { Product } from 'src/modules/product/models/product.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.cart, { nullable: false })
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  // @Column({ type: 'bigint' })
  // user_id: number;

  @ManyToOne(() => Product, (product) => product.cartItems, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'bigint' })
  product_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
