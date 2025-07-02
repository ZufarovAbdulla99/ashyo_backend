// me.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../address/entity';
import { Region } from '../region/entity';
import { User } from './models';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        'address',
        'address.region',
        'address.city',
        'address.district',
        'order',
      ],
    });
  }

  async updateUser(
    id: number,
    updateData: Partial<User>,
  ): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) return null;
    if (!user.is_verified) throw new Error('User is not verified');

    await this.userRepository.update(id, updateData);
    return this.getUserById(id);
  }
}
