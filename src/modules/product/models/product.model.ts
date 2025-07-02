import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/modules/category';
import { Brand } from 'src/modules/brand';
import { Comment } from 'src/modules/comment';
import { Like } from 'src/modules/like';
import { ProductItem } from 'src/modules/product_item';
import { CartItem } from 'src/modules/cart_item';
import { Banner } from 'src/modules/banner';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_liked: boolean;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['3 oy', '6 oy', '12 oy'],
  })
  nasiya: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  is_aksiya: boolean;

  @Column()
  brand_id: number;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  // Bu yerda xato bor edi - likes bo'lishi kerak, like emas
  @OneToMany(() => Like, (like) => like.product)
  likes: Like[];

  @OneToMany(() => ProductItem, (item) => item.product)
  product_item: ProductItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Banner, (banner) => banner.product)
  banners: Banner[];
}