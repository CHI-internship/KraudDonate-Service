import { Injectable } from '@nestjs/common';
import UserRepository from './repository/user.repository';
import OrderRepository from './repository/order.repository';

// function doSomethingWithUser(user) {
//   user.emails.toUpperCase();
// }

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private orderRepository: OrderRepository,
  ) {}

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    const orders = await this.orderRepository.getSomething();
    // doSomethingWithUser(user);
    return { user, orders };
  }
}
