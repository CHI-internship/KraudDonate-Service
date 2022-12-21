import { OrderStatusEnum } from '../../../types/order-status.enum';

export class SortOrdersDto {
  page: string;
  limit: string;
  sort: string;
  sortBy: string;
  search: string;
  status: OrderStatusEnum;
}
