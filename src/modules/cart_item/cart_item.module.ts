import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart_item.controller';
import { CartItemService } from './cart_item.service';
import { CartItem } from './models/cart_item.model';
import { User } from '../user/models/user.model';
import { Product } from '../product/models/product.model';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User, Product])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}

