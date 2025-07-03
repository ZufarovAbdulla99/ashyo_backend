import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductConfiguration } from './models/product_configuration.model';
import { CreateProductConfigurationDto } from './dto/create-product_configuration.dto';
import { UpdateProductConfigurationDto } from './dto/update-product_configuration.dto';

@Injectable()
export class ProductConfigurationService {
  constructor(
    @InjectRepository(ProductConfiguration)
    private readonly productConfigurationRepository: Repository<ProductConfiguration>,
  ) {}

  async create(
    dto: CreateProductConfigurationDto,
  ): Promise<ProductConfiguration> {
    const newConfig = this.productConfigurationRepository.create(dto);
    return this.productConfigurationRepository.save(newConfig);
  }

  async findAll(): Promise<ProductConfiguration[]> {
    return this.productConfigurationRepository.find({
      relations: ['productItem', 'variationOption'],
    });
  }

  async findOne(id: number): Promise<ProductConfiguration> {
    const config = await this.productConfigurationRepository.findOne({
      where: { id },
      relations: ['productItem', 'variationOption'],
    });

    if (!config) {
      throw new NotFoundException(
        `ProductConfiguration with ID ${id} not found.`,
      );
    }

    return config;
  }

  async update(
    id: number,
    dto: UpdateProductConfigurationDto,
  ): Promise<ProductConfiguration> {
    const config = await this.findOne(id);
    const updated = this.productConfigurationRepository.merge(config, dto);
    return this.productConfigurationRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const config = await this.findOne(id);
    await this.productConfigurationRepository.remove(config);
  }
}
