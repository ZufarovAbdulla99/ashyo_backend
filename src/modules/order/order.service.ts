import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        'user',
        'address',
        'address.region',
        'address.city',
        'address.district',
      ],
      // select: {
      //   user: { id: true, name: true, email: true }, // TypeORM'da faqat `find` emas, `QueryBuilder` bilan yaxshiroq ishlaydi
      //   address: { id: true, address: true, city: true, country: true }
      // }
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        'user',
        'address',
        'address.region',
        'address.city',
        'address.district',
      ],
      // select: {
      //   user: { id: true, name: true, email: true },
      //   address: { id: true, address: true, city: true, country: true }
      // }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      return null;
    }
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
}