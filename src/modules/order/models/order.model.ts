import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Address } from 'src/modules/address/entity/address.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/modules/user/models/user.model';
import { OrderItems } from 'src/modules/order_items/models/order_item.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
  order_items: OrderItems[];

  @Column({ type: 'bigint' })
  address_id: number;

  @ManyToOne(() => Address, (address) => address.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_price: number;
}
