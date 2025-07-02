import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionService],
  controllers: [RegionController],
})
export class RegionModule {}

