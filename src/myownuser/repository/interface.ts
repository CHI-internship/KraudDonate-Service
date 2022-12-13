import { User, Order } from '@prisma/client';

export interface IUserRepo {
  getById(id: number): Promise<User | null>;
}
export interface IOrderRepo {
  getSomething(): Promise<Order[]>;
}
