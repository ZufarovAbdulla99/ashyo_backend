import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { Variation } from './models';
import { Category } from '../category';

@Module({
  imports: [TypeOrmModule.forFeature([Variation, Category])],
  controllers: [VariationController],
  providers: [VariationService],
  exports: [VariationService],
})
export class VariationModule {}

