import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { ProductItem } from '../product_item/models/product_item.entity';
import { Order } from '../order/models/order.model';
import { OrderItems } from './models/order_item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItems, ProductItem, Order]),
    forwardRef(() => require('../product_item/product_item.module').ProductItemModule),
    forwardRef(() => require('../order/order.module').OrderModule),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}


