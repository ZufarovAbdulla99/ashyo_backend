import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Variation } from './models/variation.entity';
import { Category } from '../category/models/category.model';

@Injectable()
export class VariationService {
  constructor(
    @InjectRepository(Variation)
    private readonly variationRepo: Repository<Variation>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createVariationDto: CreateVariationDto): Promise<Variation> {
    const category = await this.categoryRepo.findOne({
      where: { id: createVariationDto.category_id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createVariationDto.category_id} not found.`,
      );
    }

    const variation = this.variationRepo.create({
      ...createVariationDto,
      category,
    });

    return this.variationRepo.save(variation);
  }

  async findAll(): Promise<Variation[]> {
    return this.variationRepo.find({
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Variation> {
    const variation = await this.variationRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!variation) {
      throw new NotFoundException(`Variation with ID ${id} not found.`);
    }

    return variation;
  }

  async update(
    id: number,
    updateVariationDto: UpdateVariationDto,
  ): Promise<Variation> {
    const variation = await this.findOne(id);

    if (updateVariationDto.category_id) {
      const category = await this.categoryRepo.findOne({
        where: { id: updateVariationDto.category_id },
      });

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateVariationDto.category_id} not found.`,
        );
      }

      variation.category = category;
    }

    Object.assign(variation, updateVariationDto);

    return this.variationRepo.save(variation);
  }

  async delete(id: number): Promise<void> {
    const variation = await this.findOne(id);
    await this.variationRepo.remove(variation);
  }
}
