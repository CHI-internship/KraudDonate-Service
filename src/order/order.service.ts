import { UserService } from '../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import OrderRepository from '../order/repository/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';
import { OrderFiltersType } from '../types/order-filters.type';

export interface OrderByCase {
  title?: any;
  sum?: any;
  finished_at?: any;
  createdAt?: any;
}

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private awsService: AwsService,
    private userService: UserService,
  ) {}

  async getAllOrders(params: OrderFiltersType) {
    let orderByCase: OrderByCase;

    switch (params.sortBy) {
      case 'name':
        orderByCase = { title: params.sort };
        break;
      case 'popularity':
        orderByCase = { sum: params.sort };
        break;
      case 'remain':
        orderByCase = { finished_at: params.sort };
        break;
      case 'date':
        orderByCase = { createdAt: params.sort };
        break;
      default:
        orderByCase = {};
        break;
    }

    return this.orderRepository.getAllOrders(params, orderByCase);
  }

  async getOrderById(id: number) {
    return this.orderRepository.getOrderById(id);
  }

  async createOrder(order: CreateOrderDto, userEmail: string) {
    const user = await this.userService.getByEmail(userEmail);
    if (!user) throw new BadRequestException('User not found');

    if (order.photo) {
      order.photo = await this.awsService.uploadImg(
        order.photo,
        AwsBucketFolders.ORDER,
      );
    }
    return this.orderRepository.createOrder(order, user.id);
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

  async getUserOrder(id: number, email: string) {
    return this.orderRepository.getUserOrder(id, email);
  }
}
