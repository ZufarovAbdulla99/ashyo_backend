import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entity';
import { Region } from '../region';
import { User } from '../user';
import { Order } from '../order';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Region, User, Order])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}