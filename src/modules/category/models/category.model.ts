import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Banner } from 'src/modules/banner/model/banner.model';
import { Product } from 'src/modules/product/models/product.model';
import { Variation } from 'src/modules/variation/models/variation.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  icon: string;

  @Column({ type: 'int', nullable: true })
  parentCategoryId: number;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subCategories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Variation[];

  @OneToMany(() => Banner, (banner) => banner.category)
  banners: Banner[];
}
