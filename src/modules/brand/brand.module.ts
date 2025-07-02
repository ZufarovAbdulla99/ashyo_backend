import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { FileService } from '../file/file.service';
import { Brand } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, FileService],
  controllers: [BrandController],
})
export class BrandModule {}
