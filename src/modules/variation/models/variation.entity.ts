import { Category } from 'src/modules/category/models/category.model';
import { VariationOption } from 'src/modules/variation_option/models/variation_option.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'variation' })
export class Variation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => Category, (category) => category.variations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => VariationOption, (option) => option.variation)
  options: VariationOption[];
}
