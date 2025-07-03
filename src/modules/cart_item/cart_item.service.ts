import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './models/cart_item.model';
import { User } from '../user/models/user.model';
import { Product } from '../product/models/product.model';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found.`);
    }
    return cartItem;
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    Object.assign(cartItem, updateCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async delete(id: number): Promise<void> {
    const cartItem = await this.findOne(id);
    await this.cartItemRepository.remove(cartItem);
  }
}