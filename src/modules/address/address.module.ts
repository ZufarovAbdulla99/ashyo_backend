import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entity/address.entity';
import { Order } from '../order/models/order.model';
import { Region } from '../region/entity/region.entity';
import { User } from '../user/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Region, User, Order])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}