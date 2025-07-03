import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FileService } from '../file/file.service';
import { Category } from './models/category.model';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, FileService],
  controllers: [CategoryController],
})
export class CategoryModule {}

