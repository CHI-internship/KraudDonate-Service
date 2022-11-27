import { BadRequestException } from '@nestjs/common';
import Repository from 'src/repository/repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

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

  async createOrder(order: CreateOrderDto) {
    return await this.prismaService.order
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

  async getUserOrder(id: number, user_id: number) {
    return await this.prismaService.order
      .findFirst({
        where: {
          id,
          AND: {
            user_id,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
