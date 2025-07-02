import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfiguration } from './models';
import { ProductConfigurationController } from './product_configuration.controller';
import { ProductConfigurationService } from './product_configuration.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConfiguration])],
  controllers: [ProductConfigurationController],
  providers: [ProductConfigurationService],
})
export class ProductConfigurationModule {}