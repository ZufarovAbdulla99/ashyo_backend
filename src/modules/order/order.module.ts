import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './models';
import { User } from '../user';
import { Address } from '../address';
import { OrderItemsModule } from '../order_items';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Address]),
  forwardRef(() => OrderItemsModule),
],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

