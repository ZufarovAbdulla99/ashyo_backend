import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { UpdateUserRequest } from './interfaces/update-user.interface';
import { FileService } from '../file/file.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

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
    const existingUser = await this.userRepo.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Bu email bilan foydalanuvchi allaqachon mavjud',
      );
    }

    let image: string | undefined = undefined;

    if (file) {
      image = await this.fileService.uploadFile(file);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10); // 10 = salt rounds

    const new_user = this.userRepo.create({
      ...payload,
      image,
      password: hashedPassword,
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
    if (!user) throw new NotFoundException('User not found');

    // 🔐 Email bo‘lsa va boshqa userga tegishli bo‘lsa — xato
    if (payload.email) {
      const existingUser = await this.userRepo.findOne({
        where: { email: payload.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already in use by another user');
      }
    }

    // 🔒 Parol kelsa — hash qilish
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    // 🖼️ Fayl kelsa — eski rasmni o‘chirish, yangi rasmni yuklash
    if (file) {
      if (user.image) {
        await this.fileService.deleteFile(user.image);
      }

      const newFileName = await this.fileService.uploadFile(file);
      payload.image = newFileName;
    }

    // 📝 Userni yangilash
    await this.userRepo.update(id, payload);

    // ♻️ Yangilangan userni qayta olish
    const updatedUser = await this.userRepo.findOne({ where: { id } });

    return {
      message: 'User updated successfully',
      updatedUser,
    };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Rasmni o‘chirish
    if (user.image) {
      try {
        await this.fileService.deleteFile(user.image);
      } catch (error) {
        // Bu yerda optionally log yozish mumkin
        console.warn('Failed to delete file:', error.message);
      }
    }

    await this.userRepo.delete(id);

    return { message: 'User deleted successfully' };
  }
}
