import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.model';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async getAllCarts(): Promise<Cart[]> {
    return await this.cartRepository.find({
      relations: ['cart_items'], // agar cart_items degan relation mavjud bo‘lsa
    });
  }

  async getSingleCart(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['cart_items'], // agar kerak bo‘lsa
    });
    if (!cart) throw new NotFoundException(`Cart with ID ${id} not found`);
    return cart;
  }

  async createCart(): Promise<{ message: string; new_cart: Cart }> {
    const new_cart = this.cartRepository.create(); // hech qanday payload kerak emas
    await this.cartRepository.save(new_cart);

    return {
      message: 'Cart created successfully!',
      new_cart,
    };
  }

  async updateCart(
    id: number,
    _payload: UpdateCartDto,
  ): Promise<{ message: string; updatedCart: Cart }> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) throw new NotFoundException(`Cart with ID ${id} not found`);

    // hozircha payloadga mos property yo‘q, shunchaki saqlaymiz
    await this.cartRepository.save(cart);

    return {
      message: 'Cart updated successfully',
      updatedCart: cart,
    };
  }

  async deleteCart(id: number): Promise<{ message: string }> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) return { message: `${id} raqamli Cart topilmadi!!!` };
    await this.cartRepository.remove(cart);
    return {
      message: 'Cart deleted successfully',
    };
  }
}
