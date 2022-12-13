import { Status } from '@prisma/client';
import Repository from '../../repository/repository';
import { IOrderRepo } from './interface';

export default class MocOrderRepository
  extends Repository
  implements IOrderRepo
{
  async getSomething() {
    return [
      {
        id: 1,
        title: 'Soap',
        info: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
        user_id: 1,
        photo: 'https://loremflickr.com/640/480/business',
        goal_amount: 387.08,
        sum: 0.85,
        short_info:
          'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
        finished_at: new Date(),
        status: Status.open,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Car',
        info: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        user_id: 1,
        photo: 'https://loremflickr.com/640/480/business',
        goal_amount: 33.56,
        sum: 6.68,
        short_info:
          'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
        finished_at: new Date(),
        status: Status.open,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
