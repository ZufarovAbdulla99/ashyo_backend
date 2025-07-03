import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';
import { ProductItem } from './models/product_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItem])],
  controllers: [ProductItemController],
  providers: [ProductItemService, FileService],
  exports: [ProductItemService],
})
export class ProductItemModule {}
