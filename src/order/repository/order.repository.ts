import { BadRequestException } from '@nestjs/common';
import Repository from 'src/repository/repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderStatusEnum } from '../../types/order-status.enum';

export default class OrderRepository extends Repository {
  async getAllOrders(
    limit: number,
    sort,
    page: number,
    search: string,
    status: OrderStatusEnum,
  ) {
    const skip = limit * (page - 1);
    const orders = await this.prismaService.order
      .findMany({
        skip,
        take: limit,
        orderBy: {
          id: sort,
        },
        where: {
          status,
          title: {
            contains: search,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    const ordersCount = await this.prismaService.order.count({
      where: {
        status,
        title: {
          contains: search,
        },
      },
    });

    const totalPages = Math.ceil(ordersCount / limit);

    return {
      page,
      limit,
      totalPages,
      data: orders,
    };
  }

  async getOrderById(id: number) {
    return await this.prismaService.order
      .findFirst({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createOrder(order: CreateOrderDto, userId: number) {
    return await this.prismaService.order
      .create({
        data: {
          title: order.title,
          info: order.info,
          user_id: userId,
          photo: order.photo,
          goal_amount: order.goal_amount,
          short_info: order.short_info,
          finished_at: new Date(order.finished_at).toISOString(),
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async updateOrder(
    {
      title,
      info,
      short_info,
      finished_at,
      sum,
      goal_amount,
      photo,
    }: UpdateOrderDto,
    id: number,
  ) {
    return await this.prismaService.order
      .update({
        where: { id },
        data: {
          title: title != null ? title : undefined,
          info: info != null ? info : undefined,
          photo: photo != null ? photo : undefined,
          goal_amount: goal_amount != null ? goal_amount : undefined,
          sum: sum != null ? sum : undefined,
          short_info: short_info != null ? short_info : undefined,
          finished_at:
            finished_at != null
              ? new Date(finished_at).toISOString()
              : undefined,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async getUserOrder(id: number, email: string) {
    return await this.prismaService.order
      .findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
