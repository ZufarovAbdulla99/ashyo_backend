import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { Banner } from './model/banner.model';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createBannerDto: CreateBannerDto,
    file: Express.Multer.File,
  ): Promise<Banner> {
    const image = await this.fileService.uploadFile(file);

    const banner = this.bannerRepository.create({
      ...createBannerDto,
      image,
    });

    return this.bannerRepository.save(banner);
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerRepository.find({
      relations: ['product', 'category'],
    });
  }

  async findOne(id: number): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({
      where: { id },
      relations: ['product', 'category'],
    });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.findOne(id);

    Object.assign(banner, updateBannerDto);
    return this.bannerRepository.save(banner);
  }

  async remove(id: number): Promise<void> {
    const banner = await this.findOne(id);
    await this.bannerRepository.remove(banner);
  }
}