import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Like } from './models';
// import { Product } from '../product/models/product.model';
import { ProductModule } from '../product';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    forwardRef(() => ProductModule)
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}