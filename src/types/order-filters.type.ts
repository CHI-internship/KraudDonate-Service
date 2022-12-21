import { OrderStatusEnum } from './order-status.enum';

export class OrderFiltersType {
  page: number;
  limit: number;
  sort: string;
  sortBy: string;
  search: string;
  status: OrderStatusEnum;
}
