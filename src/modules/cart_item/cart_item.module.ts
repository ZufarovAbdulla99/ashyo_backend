import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './models';
import { User } from '../user';
import { Product } from '../product';
import { CartItemController } from './cart_item.controller';
import { CartItemService } from './cart_item.service';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User, Product])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}

