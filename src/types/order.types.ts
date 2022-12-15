import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

export interface IOrder {
  id: number;
  title: string;
  info: string;
  user_id: number;
  photo: string;
  goal_amount: number;
  sum: number;
  short_info: string;
  finished_at: Date;
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetOrdersRes {
  page: number;
  limit: number;
  totalPages: number;
  data: IOrder[];
}

export interface IOrderRepository {
  getAllOrders(
    limit: number,
    sort,
    page: number,
    search: string,
  ): Promise<IGetOrdersRes | null>;

  getOrderById(id: number): Promise<IOrder | null>;
  createOrder(order: CreateOrderDto, userId: number): Promise<IOrder | null>;
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
  ): Promise<IOrder | null>;
  getUserOrder(id: number, email: string): Promise<IOrder | null>;
}
