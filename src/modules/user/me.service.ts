import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { UpdateMeDto } from './dtos/update-me.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'address',
        'address.region',
        'address.city',
        'address.district',
        'order',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, updateData: UpdateMeDto): Promise<User> {
    try {
      const user = await this.getUserById(id);

      if (!user.is_verified) {
        throw new BadRequestException('User is not verified');
      }

      // Parolni xashlash
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      await this.userRepository.update(id, updateData);
      return await this.getUserById(id); // qayta o‘qib beradi
    } catch (error) {
      console.error('Update user error:', error.message);
      throw error;
    }
  }
}
