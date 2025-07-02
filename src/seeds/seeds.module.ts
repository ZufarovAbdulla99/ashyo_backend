import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Category,
  Product,
  Brand,
  Banner,
  ProductItem,
  Color,
} from '@modules';

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
