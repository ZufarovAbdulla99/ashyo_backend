import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/modules/order';
import { Region } from 'src/modules/region';
import { User } from 'src/modules/user';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.address, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Region, { nullable: false })
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => Region, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city?: Region;

  @ManyToOne(() => Region, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: Region;

  @Column({ type: 'varchar', length: 255, nullable: false })
  street: string;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}