// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from '../file';
import { CreateUserDto } from './dtos';
import { UpdateUserRequest } from './interfaces';
import { Address } from '../address/entity';
import { Region } from '../region/entity';
import { User } from './models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private fileService: FileService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find({
      relations: {
        like: true,
        comment: true,
        cartItems: { product: true },
        address: {
          region: true,
          city: true,
          district: true,
        },
      },
      select: {
        // like: { id: true, product: { id: true } },
        comment: { id: true, product: { id: true } },
        cartItems: { id: true, product: { id: true } },
      },
    });
  }

  async getSingleUser(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: { id },
      relations: {
        like: true,
        comment: true,
        cartItems: { product: true },
        address: {
          region: true,
          city: true,
          district: true,
        },
      },
      select: {
        // like: { id: true, product: { id: true } },
        comment: { id: true, product: { id: true } },
        cartItems: { id: true, product: { id: true } },
      },
    });
  }

  async createUser(
    payload: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<{ message: string; new_user: User }> {
    const image = await this.fileService.uploadFile(file);
    const new_user = this.userRepo.create({
      ...payload,
      image,
    });
    await this.userRepo.save(new_user);

    return {
      message: 'User created successfully',
      new_user,
    };
  }

  async updateUser(
    id: number,
    payload: UpdateUserRequest,
    file?: Express.Multer.File,
  ): Promise<{ message: string; updatedUser: User }> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    if (file) {
      if (user.image) {
        await this.fileService.deleteFile(user.image);
      }
      const newFileName = await this.fileService.uploadFile(file);
      payload.image = newFileName;
    }

    await this.userRepo.update(id, payload);
    const updatedUser = await this.userRepo.findOne({ where: { id } });

    return {
      message: 'User updated successfully',
      updatedUser,
    };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    if (user.image) {
      await this.fileService.deleteFile(user.image);
    }

    await this.userRepo.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
