import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { LikeModule } from '../like/like.module';
import { FileModule } from '../file/file.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => LikeModule),
    forwardRef(() => FileModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}