import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { IGetOrdersRes, IOrderRepository, IOrder } from 'src/types';

export const orderMock = (): IOrder => {
  return {
    id: 1,
    title: 'DeleteThisOrder',
    info: 'Info',
    user_id: 1,
    photo: 'photo',
    goal_amount: 1000,
    sum: 250,
    short_info: 'Short Info',
    finished_at: new Date('2022-12-10T13:54:37.019Z'),
    status: 'open',
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
  };
};

export const orderResMock = (): IGetOrdersRes => {
  return {
    page: 1,
    limit: 10,
    totalPages: 7,
    data: [orderMock(), orderMock()],
  };
};

export class MockOrderRepository implements IOrderRepository {
  getAllOrders(limit: number, sort: any, page: number, search: string) {
    return Promise.resolve(orderResMock());
  }

  getOrderById(id: number) {
    return Promise.resolve(orderMock());
  }

  createOrder(order: CreateOrderDto, userId: number) {
    return Promise.resolve(orderMock());
  }

  updateOrder(
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
    return Promise.resolve(orderMock());
  }

  getUserOrder(id: number, email: string) {
    return Promise.resolve(orderMock());
  }
}
