import { ProductConfiguration } from 'src/modules/product_configuration/models/product_configuration.model';
import { Variation } from 'src/modules/variation/models/variation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'variation_option' })
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  value: string;

  @ManyToOne(() => Variation, (variation) => variation.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'variation_id' })
  variation: Variation;

  @OneToMany(() => ProductConfiguration, (config) => config.variationOption)
  configurations: ProductConfiguration[];
}
