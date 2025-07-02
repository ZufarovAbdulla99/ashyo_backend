import { Order } from 'src/modules/order/models';
import { ProductItem } from 'src/modules/product_item';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  order_id: number;

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'bigint' })
  product_item_id: number;

  @ManyToOne(() => ProductItem, (productItem) => productItem.order_items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_item_id' })
  product_item: ProductItem;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'bigint' })
  price: number;
}
