import { BadRequestException } from '@nestjs/common';
import Repository from 'src/repository/repository';
import { CreateOrderDto } from 'src/volunteer/dto/create-order.dto';
import { UpdateOrderDto } from 'src/volunteer/dto/update-order.dto';

export default class OrderRepository extends Repository {
  async getAllOrders(limit: number, sort, page: number, search: string) {
    const skip = limit * (page - 1);
    const orders = await this.prismaService.order
      .findMany({
        skip,
        take: limit,
        orderBy: {
          id: sort,
        },
        where: {
          title: {
            contains: search,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
    const totalPages = Math.round(
      (await this.prismaService.order.findMany()).length / limit,
    );
    return {
      page,
      limit,
      totalPages,
      data: orders,
    };
  }

  async getOrderById(id: number) {
    return this.prismaService.order
      .findFirst({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createOrder(order: CreateOrderDto) {
    console.log(order);
    return this.prismaService.order
      .create({
        data: {
          title: order.title,
          info: order.info,
          user_id: order.user_id,
          photo: order.photo,
          goal_amount: order.goal_amount,
          sum: order.sum,
          short_info: order.short_info,
          finished_at: new Date(order.finished_at).toISOString(),
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async updateOrder(order: UpdateOrderDto, id: number) {
    return this.prismaService.order
      .update({
        where: { id },
        data: {
          title: order.title,
          info: order.info,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
