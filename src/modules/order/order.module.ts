import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './models/order.model';
import { User } from '../user/models/user.model';
import { Address } from '../address/entity/address.entity';
import { OrderItemsModule } from '../order_items/order_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Address]),
  forwardRef(() => OrderItemsModule),
],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

