import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from './model/banner.model';
import { FileService } from '../file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerService, FileService],
  controllers: [BannerController],
})
export class BannerModule {}
