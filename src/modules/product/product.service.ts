import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { Repository, ILike, Between } from 'typeorm';
import { FileService } from '../file/file.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductRequest } from './interfaces/update-product.interface';
import { ProductFilterDto } from './interfaces/product-filer.interface';
import { Category } from '../category/models/category.model';
import { PaginatedResponse } from './interfaces/paginate-product.interface';
import { ProductItem } from '../product_item/models/product_item.entity';
import { VariationOption } from '../variation_option/models/variation_option.model';
import { ProductConfiguration } from '../product_configuration/models/product_configuration.model';
import { Like } from '../like/models/like.model';
import { LikeService } from '../like/like.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
    // @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
    
    @Inject(forwardRef(() => LikeService))
    private readonly likeService: LikeService,
  ) {}

  // User tomonidan yoqtirilgan mahsulotlarni olish - LikeService dan
  async findLikedByUser(userId: number): Promise<Product[]> {
    return await this.likeService.getLikedProducts(userId);
  }

  // Barcha mahsulotlarni filter bilan olish
  async getAllProducts(filters?: ProductFilterDto): Promise<PaginatedResponse<Product>> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.comments', 'comments')
      .leftJoinAndSelect('product.likes', 'likes')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.product_item', 'product_item')
      .leftJoinAndSelect('product_item.productConfigurations', 'productConfigurations')
      .leftJoinAndSelect('productConfigurations.variationOption', 'variationOption');

    if (filters) {
      if (filters.category_id) {
        query.andWhere('product.category_id = :category_id', { category_id: filters.category_id });
      }

      if (filters.brand_id) {
        query.andWhere('product.brand_id = :brand_id', { brand_id: filters.brand_id });
      }

      if (filters.min_price && filters.max_price) {
        query.andWhere('product.price BETWEEN :min AND :max', {
          min: filters.min_price,
          max: filters.max_price,
        });
      } else if (filters.min_price) {
        query.andWhere('product.price >= :min', { min: filters.min_price });
      } else if (filters.max_price) {
        query.andWhere('product.price <= :max', { max: filters.max_price });
      }

      if (filters.search) {
        query.andWhere(
          '(product.name ILIKE :search OR product.description ILIKE :search)',
          { search: `%${filters.search}%` },
        );
      }

      if (filters.sort) {
        switch (filters.sort) {
          case 'price_asc':
            query.orderBy('product.price', 'ASC');
            break;
          case 'price_desc':
            query.orderBy('product.price', 'DESC');
            break;
          case 'rating_desc':
            query.orderBy('product.rating', 'DESC');
            break;
        }
      }
    }

    const [items, count] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  // Bitta mahsulotni olish
  async getSingleProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['comments', 'likes', 'category', 'product_item', 'brand'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // Eng ko'p chegirmali mahsulotlarni olish
  async getTopDiscountedProducts(): Promise<Product[]> {
    return this.productRepository.find({
      where: { is_aksiya: true },
      relations: ['category', 'brand'],
      order: { rating: 'DESC' },
      take: 10,
    });
  }

  // Yangi mahsulot yaratish
  async createProduct(payload: CreateProductDto, file: Express.Multer.File): Promise<{ message: string; new_product: Product }> {
    const image = await this.fileService.uploadFile(file);

    const new_product = this.productRepository.create({
      ...payload,
      image,
    });

    await this.productRepository.save(new_product);

    return {
      message: 'Product created successfully',
      new_product,
    };
  }

  // Mahsulotni yangilash
  async updateProduct(
    id: number,
    payload: UpdateProductRequest,
    file?: Express.Multer.File,
  ): Promise<{ message: string; updatedProduct: Product }> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (file) {
      const newFileName = await this.fileService.uploadFile(file);
      if (product.image) {
        await this.fileService.deleteFile(product.image);
      }
      payload.image = newFileName;
    }

    const updated = this.productRepository.merge(product, payload);
    const updatedProduct = await this.productRepository.save(updated);

    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  // Mahsulotni o'chirish
  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.image) {
      await this.fileService.deleteFile(product.image);
    }

    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
    };
  }

  // Mahsulot like holatini o'zgartirish
  async toggleProductLike(id: number, userId: number): Promise<{ message: string; isLiked: boolean }> {
    // LikeService orqali like/unlike qilish
    const toggleLikeDto = { userId, productId: id };
    const result = await this.likeService.toggleLike(toggleLikeDto);

    return {
      message: result.message,
      isLiked: result.isLiked,
    };
  }
}