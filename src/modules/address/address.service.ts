import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity';
import { Region } from '../region';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { addressSeedData } from './address.seeds';

@Injectable()
export class AddressService implements OnModuleInit {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async onModuleInit(): Promise<void> {
    // Jadvaldagi rowlar sonini tekshirish
    const count = await this.addressRepository.count();
    if (count === 0) {
      // Seed ma'lumotlarni qo'shish
      await this.addressRepository.save(addressSeedData);
      console.log('Seeding complete.');
    } else {
      console.log('Table already contains data. Skipping seed.');
    }
  }

  async create(createAddressDto: CreateAddressDto) {
    const { region_id, city_id, district_id } = createAddressDto;

    if (region_id === null && district_id) {
      // Toshkent shahar uchun tekshiruv
      const district = await this.regionRepository.findOne({
        where: { id: district_id, type: 'DISTRICT', parent: null },
      });
      if (!district) {
        throw new Error('Invalid district for Tashkent city');
      }
    } else if (region_id && district_id) {
      // Viloyatlar uchun tekshiruv
      if (city_id) {
        const city = await this.regionRepository.findOne({
          where: { id: city_id, type: 'CITY', parent: { id: region_id } },
        });
        if (!city) {
          throw new Error('Invalid city for selected region');
        }

        const district = await this.regionRepository.findOne({
          where: { id: district_id, type: 'DISTRICT', parent: { id: city_id } },
        });
        if (!district) {
          throw new Error('Invalid district for selected city');
        }
      } else {
        const district = await this.regionRepository.findOne({
          where: { id: district_id, type: 'DISTRICT', parent: { id: region_id } },
        });
        if (!district) {
          throw new Error('Invalid district for selected region');
        }
      }
    }

    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  async findAll() {
    return this.addressRepository.find({
      relations: ['region', 'city', 'district'],
      select: {
        region: { id: true, name: true, type: true },
        city: { id: true, name: true, type: true },
        district: { id: true, name: true, type: true },
      },
    });
  }

  async findOne(id: number) {
    return this.addressRepository.findOne({
      where: { id },
      relations: ['region', 'city', 'district'],
      select: {
        region: { id: true, name: true, type: true },
        city: { id: true, name: true, type: true },
        district: { id: true, name: true, type: true },
      },
    });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new Error('Address not found');
    }
    return this.addressRepository.save({ ...address, ...updateAddressDto });
  }

  async remove(id: number) {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new Error('Address not found');
    }
    await this.addressRepository.remove(address);
    return { message: 'Address deleted successfully' };
  }
}