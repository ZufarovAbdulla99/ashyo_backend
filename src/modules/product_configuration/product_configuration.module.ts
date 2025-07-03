import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfigurationController } from './product_configuration.controller';
import { ProductConfigurationService } from './product_configuration.service';
import { ProductConfiguration } from './models/product_configuration.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConfiguration])],
  controllers: [ProductConfigurationController],
  providers: [ProductConfigurationService],
})
export class ProductConfigurationModule {}