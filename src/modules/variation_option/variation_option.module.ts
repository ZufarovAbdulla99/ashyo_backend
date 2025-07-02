import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationOptionService } from './variation_option.service';
import { VariationOptionController } from './variation_option.controller';
import { VariationOption } from './models';
import { Variation } from '../variation/models';

@Module({
  imports: [TypeOrmModule.forFeature([VariationOption, Variation])],
  controllers: [VariationOptionController],
  providers: [VariationOptionService],
  exports: [VariationOptionService],
})
export class VariationOptionModule {}

