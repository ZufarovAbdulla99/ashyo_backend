import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entity';
import { CreateRegionDto, UpdateRegionDto } from './dto';
import { regionSeedData } from './region.seeds';

@Injectable()
export class RegionService implements OnModuleInit {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.regionRepository.count();

    if (count === 0) {
      // Avval parent: null bo‘lgan regionlarni saqlaymiz
      const parents = regionSeedData.filter((item) => item.parent === null);
      const savedParents = await this.regionRepository.save(parents);

      // Endi farzandlar (childlar) uchun parent objectini to‘g‘ri biriktiramiz
      const children = regionSeedData
        .filter((item) => item.parent !== null)
        .map((item) => {
          const parentId = (item.parent as Region).id;
          return {
            name: item.name,
            type: item.type,
            parent: savedParents.find((p) => p.id === parentId),
          };
        });

      await this.regionRepository.save(children);

      console.log('Seeding complete.');
    } else {
      console.log('Table already contains data. Skipping seed.');
    }
  }

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = this.regionRepository.create(createRegionDto);
    return this.regionRepository.save(region);
  }

  // // Shahar yaratish
  // async createCity(name: string, region_id: number): Promise<Region> {
  //   return this.regionRepository.save({ name, type: 'CITY', parent: { id: region_id } as Region });
  // }

  // // Tuman yaratish
  // async createDistrict(name: string, region_id: number): Promise<Region> {
  //   return this.regionRepository.save({ name, type: 'DISTRICT', parent: { id: region_id } as Region });
  // }

  async getRegionById(id: number): Promise<Region> {
    return this.regionRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async getAllRegions(): Promise<Region[]> {
    return this.regionRepository.find({ relations: ['parent', 'children'] });
  }

  async getParentRegions(): Promise<Region[]> {
    return this.regionRepository.find({
      where: { parent: null },
      order: { id: 'ASC' },
    });
  }

  async updateRegion(id: number, dto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionRepository.findOneBy({ id });
    if (!region) throw new Error('Region not found');

    // DTO bilan to‘ldirish
    if (dto.name !== undefined) region.name = dto.name;
    if (dto.type !== undefined) region.type = dto.type;
    if (dto.region_id !== undefined) {
      region.parent =
        dto.region_id === null ? null : ({ id: dto.region_id } as Region);
    }

    return this.regionRepository.save(region);
  }

  async deleteRegion(id: number): Promise<void> {
    const region = await this.regionRepository.findOneBy({ id });
    if (!region) throw new Error('Region not found');
    await this.regionRepository.remove(region);
  }
}
