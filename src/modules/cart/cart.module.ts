// src/modules/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product } from '../product'; // Product entity
import { User } from '../user';       // User entity
import { Cart } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, User])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
