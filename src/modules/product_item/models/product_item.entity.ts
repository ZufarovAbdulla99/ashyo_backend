import { Color } from 'src/modules/color/models/color.model';
import { OrderItems } from 'src/modules/order_items/models/order_item.entity';
import { Product } from 'src/modules/product/models/product.model';
import { ProductConfiguration } from 'src/modules/product_configuration/models/product_configuration.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('product_item')
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Product, (product) => product.product_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: number;

  @ManyToOne(() => Color, (color) => color.product_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @Column()
  color_id: number;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.product_item)
  order_items: OrderItems[];

  @OneToMany(
    () => ProductConfiguration,
    (configuration) => configuration.productItem,
    { cascade: true },
  )
  configurations: ProductConfiguration[];
}
