import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './model';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { FileService } from '../file';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerService, FileService],
  controllers: [BannerController],
})
export class BannerModule {}
