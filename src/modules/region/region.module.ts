import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entity/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionService],
  controllers: [RegionController],
})
export class RegionModule {}

