import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/models/product.model';
import { Repository } from 'typeorm';
import { Like } from './models/like.model';
import { ProductService } from '../product/product.service';
import { ToggleLikeDto } from './dtos/toggle-like.dto';
import { CreateLikeDto } from './dtos/create-like.dto';
import { UpdateLikeDto } from './dtos/update-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async toggleLike(
    toggleLikeDto: ToggleLikeDto,
  ): Promise<{ message: string; isLiked: boolean }> {
    const { userId, productId } = toggleLikeDto;

    // ProductService orqali mahsulot mavjudligini tekshirish
    await this.productService.getSingleProduct(productId);

    const existing = await this.likeRepository.findOne({
      where: { user_id: userId, product_id: productId },
    });

    let created = false;

    if (!existing) {
      const newLike = this.likeRepository.create({
        user_id: userId,
        product_id: productId,
      });
      await this.likeRepository.save(newLike);
      created = true;
    } else {
      await this.likeRepository.remove(existing);
    }

    return {
      message: created
        ? 'Product liked successfully'
        : 'Product unliked successfully',
      isLiked: created,
    };
  }

  // User tomonidan like qilingan mahsulotlar
  async getLikedProducts(userId: number): Promise<Product[]> {
    const likes = await this.likeRepository.find({
      where: { user_id: userId },
      relations: ['product', 'product.category', 'product.brand'],
    });
    
    return likes.map(like => like.product);
  }

  // User tomonidan like qilingan mahsulotlar ID arraysi
  async getLikedProductsIdsArray(userId: number): Promise<number[]> {
    const likes = await this.likeRepository.find({
      where: { user_id: userId },
      select: ['product_id']
    });
    
    return likes.map(like => like.product_id);
  }

  async getSingleLike(id: number): Promise<Like> {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) throw new NotFoundException(`Like with ID ${id} not found`);
    return like;
  }

  async createLike(
    payload: CreateLikeDto,
  ): Promise<{ message: string; new_like: Like }> {
    // Mahsulot mavjudligini tekshirish
    await this.productService.getSingleProduct(payload.product_id);

    const newLike = this.likeRepository.create(payload);
    await this.likeRepository.save(newLike);
    return {
      message: 'Like created successfully!',
      new_like: newLike,
    };
  }

  async updateLike(
    id: number,
    payload: UpdateLikeDto,
  ): Promise<{ message: string; updatedLike: Like }> {
    if (payload.product_id) {
      // Yangi product_id bo'lsa, mavjudligini tekshirish
      await this.productService.getSingleProduct(payload.product_id);
    }

    await this.likeRepository.update(id, payload);
    const updatedLike = await this.likeRepository.findOne({ where: { id } });
    if (!updatedLike)
      throw new NotFoundException(`Like with ID ${id} not found`);
    return {
      message: 'Like updated successfully',
      updatedLike,
    };
  }

  async deleteLike(id: number): Promise<{ message: string }> {
    const like = await this.likeRepository.findOne({ where: { id } });
    if (!like) {
      return { message: `${id} raqamli Like topilmadi!!!` };
    }
    await this.likeRepository.remove(like);
    return {
      message: 'Like deleted successfully',
    };
  }
}