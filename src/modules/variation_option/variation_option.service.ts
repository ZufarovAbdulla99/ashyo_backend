import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariationOption } from './models/variation_option.model';
import { CreateVariationOptionDto } from './dto/create-variation_option.dto';
import { UpdateVariationOptionDto } from './dto/update-variation_option.dto';

@Injectable()
export class VariationOptionService {
  constructor(
    @InjectRepository(VariationOption)
    private readonly variationOptionRepo: Repository<VariationOption>,
  ) {}

  async create(dto: CreateVariationOptionDto): Promise<VariationOption> {
    const newOption = this.variationOptionRepo.create(dto);
    return await this.variationOptionRepo.save(newOption);
  }

  async findAll(): Promise<VariationOption[]> {
    return await this.variationOptionRepo.find({
      relations: ['variation'],
    });
  }

  async findOne(id: number): Promise<VariationOption> {
    const variationOption = await this.variationOptionRepo.findOne({
      where: { id },
      relations: ['variation'],
    });

    if (!variationOption) {
      throw new NotFoundException(`VariationOption with ID ${id} not found.`);
    }

    return variationOption;
  }

  async update(
    id: number,
    dto: UpdateVariationOptionDto,
  ): Promise<VariationOption> {
    const variationOption = await this.findOne(id);
    const updated = Object.assign(variationOption, dto);
    return await this.variationOptionRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const variationOption = await this.findOne(id);
    await this.variationOptionRepo.remove(variationOption);
  }
}
