import { BadRequestException, Injectable } from '@nestjs/common';
import OrderRepository from 'src/order/repository/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private awsService: AwsService,
  ) {}

  async getAllOrders(limit: number, sort, page: number, search: string) {
    return this.orderRepository.getAllOrders(limit, sort, page, search);
  }

  async getOrderById(id: number) {
    return this.orderRepository.getOrderById(id);
  }

  async createOrder(order: CreateOrderDto) {
    if (order.photo) {
      order.photo = await this.awsService.uploadImg(
        order.photo,
        AwsBucketFolders.ORDER,
      );
    }
    return this.orderRepository.createOrder(order);
  }

  async updateOrder(order: UpdateOrderDto, id: number) {
    if (order.photo) {
      const orderFromDB = await this.orderRepository.getOrderById(id);
      if (!orderFromDB) throw new BadRequestException('Order not found.');
      const oldPhoto = orderFromDB.photo;

      order.photo = await this.awsService
        .uploadImg(order.photo, AwsBucketFolders.ORDER)
        .then(async (data) => {
          if (oldPhoto) await this.awsService.deleteFile(oldPhoto);
          return data;
        });
    }
    return this.orderRepository.updateOrder(order, id);
  }

  async getOrderByIdByUserId(id: number, userId: number) {
    return this.orderRepository.getOrderByIdByUserId(id, userId);
  }
}
