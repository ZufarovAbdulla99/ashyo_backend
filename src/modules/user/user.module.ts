import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { FileService } from '../file';
import { UserController } from './user.controller';
import { Address } from '../address/entity/address.entity';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { Region } from '../region/entity';
import { User } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Region])],
  providers: [UserService, FileService, MeService],
  controllers: [UserController, MeController],
  exports: [UserService],
})
export class UserModule {}
