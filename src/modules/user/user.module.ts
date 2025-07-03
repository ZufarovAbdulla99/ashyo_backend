import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Address } from '../address/entity/address.entity';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { User } from './models/user.model';
import { FileService } from '../file/file.service';
import { Region } from '../region/entity/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Region])],
  providers: [UserService, FileService, MeService],
  controllers: [UserController, MeController],
  exports: [UserService],
})
export class UserModule {}
