import Repository from '../../repository/repository';
import { IOrderRepo } from './interface';

export default class OrderRepository extends Repository implements IOrderRepo {
  async getSomething() {
    const orders = await this.prismaService.order.findMany();

    return orders;
  }
}
