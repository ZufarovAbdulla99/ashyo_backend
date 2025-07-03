import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { Brand } from './models/brand.model';
import { CreateBrandRequest } from './interfaces/create-brand.interface';
import { UpdateBrandRequest } from './interfaces/update-brand.interface';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly fileService: FileService,
  ) {}

  async createBrand(
    payload: CreateBrandRequest,
    file: Express.Multer.File,
  ): Promise<{ message: string; newBrand: Brand }> {
    const image = await this.fileService.uploadFile(file);

    const newBrand = this.brandRepository.create({
      name: payload.name,
      image,
    });

    await this.brandRepository.save(newBrand);

    return {
      message: 'Brand created successfully',
      newBrand,
    };
  }

  async getAllBrands(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async getSingleBrand(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async updateBrand(
    id: number,
    payload: UpdateBrandRequest,
    file?: Express.Multer.File,
  ): Promise<{ message: string; updatedBrand: Brand }> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    if (file) {
      const newImage = await this.fileService.uploadFile(file);
      if (brand.image) {
        await this.fileService.deleteFile(brand.image);
      }
      payload.image = newImage;
    }

    const updated = Object.assign(brand, payload);
    await this.brandRepository.save(updated);

    return {
      message: 'Brand updated successfully',
      updatedBrand: updated,
    };
  }

  async deleteBrand(id: number): Promise<{ message: string }> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    if (brand.image) {
      await this.fileService.deleteFile(brand.image);
    }

    await this.brandRepository.remove(brand);

    return {
      message: 'Brand deleted successfully',
    };
  }
}

