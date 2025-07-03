import { ProductItem } from 'src/modules/product_item/models/product_item.entity';
import { VariationOption } from 'src/modules/variation_option/models/variation_option.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_configuration')
export class ProductConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_item_id: number;

  @ManyToOne(
    () => ProductItem,
    (productItem) => productItem.configurations,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItem;

  @Column()
  variation_option_id: number;

  @ManyToOne(
    () => VariationOption,
    (variationOption) => variationOption.configurations,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: VariationOption;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
