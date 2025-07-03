import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { Product } from '../product/models/product.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
