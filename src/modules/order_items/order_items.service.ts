import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from 'src/modules/order/models/order.model'
import {ProductItem} from 'src/modules/product_item/models/product_item.entity'
import { OrderItems } from './models/order_item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
  ) {}

  async create(createOrderItemDto: {
    order_id: number;
    product_item_id: number;
    quantity: number;
  }): Promise<OrderItems> {
    const productItem = await this.productItemRepository.findOne({
      where: { id: createOrderItemDto.product_item_id },
    });

    if (!productItem) {
      throw new NotFoundException('ProductItem not found');
    }

    const orderItem = this.orderItemsRepository.create({
      ...createOrderItemDto,
      price: productItem.price,
    });

    await this.orderItemsRepository.save(orderItem);

    const allOrderItems = await this.orderItemsRepository.find({
      where: { order_id: createOrderItemDto.order_id },
    });

    const totalPrice = allOrderItems.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    await this.orderRepository.update(createOrderItemDto.order_id, {
      total_price: totalPrice,
    });

    return orderItem;
  }

  async findAll(): Promise<OrderItems[]> {
    return this.orderItemsRepository.find({
      relations: ['product_item', 'order'],
    });
  }

  async findOne(id: number): Promise<OrderItems | null> {
    return this.orderItemsRepository.findOne({
      where: { id },
      relations: ['product_item', 'order'],
    });
  }
}