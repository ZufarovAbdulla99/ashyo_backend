import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { ProductItem } from './models';
import { CreateProductItemDto, UpdateProductItemDto } from './dto';


@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
    private readonly fileService: FileService,
  ) {}

  async create(
    dto: CreateProductItemDto,
    file: Express.Multer.File,
  ): Promise<ProductItem> {
    const image = await this.fileService.uploadFile(file);
    const newItem = this.productItemRepository.create({
      ...dto,
      image,
    });
    return await this.productItemRepository.save(newItem);
  }

  async findAll(): Promise<ProductItem[]> {
    return this.productItemRepository.find({
      relations: [
        'product',
        'color',
        'configurations',
        'configurations.variationOption',
        'configurations.variationOption.variation',
      ],
    });
  }

  async findOne(id: number): Promise<ProductItem> {
    const item = await this.productItemRepository.findOne({
      where: { id },
      relations: [
        'product',
        'color',
        'configurations',
        'configurations.variationOption',
        'configurations.variationOption.variation',
      ],
    });

    if (!item) {
      throw new NotFoundException(`ProductItem with ID ${id} not found.`);
    }

    return item;
  }

  async update(id: number, dto: UpdateProductItemDto): Promise<ProductItem> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.productItemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.productItemRepository.remove(item);
  }
}
