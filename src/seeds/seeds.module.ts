import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/models/user.model';
import { Category } from 'src/modules/category/models/category.model';
import { Product } from 'src/modules/product/models/product.model';
import { Brand } from 'src/modules/brand/models/brand.model';
import { Banner } from 'src/modules/banner/model/banner.model';
import { ProductItem } from 'src/modules/product_item/models/product_item.entity';
import { Color } from 'src/modules/color/models/color.model';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Category,
    Product,
    Brand,
    Banner,
    ProductItem,
    Color,
  ])],
  providers: [SeedsService],
})
export class SeedsModule {}
