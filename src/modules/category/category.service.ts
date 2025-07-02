import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { FileService } from '../file';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './models';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileService: FileService,
  ) {}

  async getAllCategories(depth = 2, limit = 7): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: this.buildCategoryTree(depth),
      take: limit,
    });
  }

  private buildCategoryTree(depth: number): string[] {
    if (depth === 0) return [];
    return [
      'subCategories',
      ...this.buildCategoryTree(depth - 1).map((r) => `subCategories.${r}`),
    ];
  }

  async createCategory(
    payload: CreateCategoryDto,
    imageFile: Express.Multer.File,
    iconFile: Express.Multer.File,
  ): Promise<{ message: string; category: Category }> {
    if (payload.parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: payload.parentCategoryId },
      });
      if (!parentCategory) {
        throw new Error(
          `Parent Category with id ${payload.parentCategoryId} not found`,
        );
      }
    }

    const image = await this.fileService.uploadFile(imageFile);
    const icon = await this.fileService.uploadFile(iconFile);

    const category = this.categoryRepository.create({
      name: payload.name,
      image,
      icon,
      parentCategory: payload.parentCategoryId
        ? { id: payload.parentCategoryId }
        : null,
    });

    await this.categoryRepository.save(category);

    return {
      message: 'Category Created Successfully',
      category,
    };
  }

  async findByName(name: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async getOneCategory(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['products', 'subCategories'],
    });
  }

  async updateCategory(
    id: number,
    payload: UpdateCategoryDto,
    imageFile?: Express.Multer.File,
    iconFile?: Express.Multer.File,
  ): Promise<{ message: string; updatedCategory: Category }> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    if (payload.parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: payload.parentCategoryId },
      });
      if (!parentCategory) {
        throw new Error(
          `Parent Category with id ${payload.parentCategoryId} not found`,
        );
      }
      category.parentCategory = parentCategory;
    }

    if (imageFile) {
      const newImage = await this.fileService.uploadFile(imageFile);
      if (category.image) {
        await this.fileService.deleteFile(category.image);
      }
      category.image = newImage;
    }

    if (iconFile) {
      const newIcon = await this.fileService.uploadFile(iconFile);
      if (category.icon) {
        await this.fileService.deleteFile(category.icon);
      }
      category.icon = newIcon;
    }

    Object.assign(category, payload);
    const updatedCategory = await this.categoryRepository.save(category);

    return {
      message: 'Category updated successfully',
      updatedCategory,
    };
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (category.image) await this.fileService.deleteFile(category.image);
    if (category.icon) await this.fileService.deleteFile(category.icon);

    await this.categoryRepository.remove(category);
  }
}