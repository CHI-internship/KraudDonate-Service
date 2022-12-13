import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { AwsService } from 'src/services';
import UserRepository from './repository/user.repository';
import OrderRepository from './repository/order.repository';
import MockUserRepository from './repository/user.moc.repository';
import MockOrderRepository from './repository/order.moc.repository';
import { PrismaService } from 'src/services';

describe('Unit tests for Service', () => {
  let userService: UserService;
  let userRepo: UserRepository;
  let orderRepo: OrderRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        AwsService,
        UserRepository,
        PrismaService,
        OrderRepository,
      ],
    })
      .overrideProvider(UserRepository)
      .useClass(MockUserRepository)
      .overrideProvider(OrderRepository)
      .useClass(MockOrderRepository)
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepo = moduleRef.get<UserRepository>(UserRepository);
    orderRepo = moduleRef.get<OrderRepository>(OrderRepository);
  });

  describe('random', () => {
    it('random IT', async () => {
      // jest
      //   .spyOn(userRepo, 'simpleGet')
      //   .mockImplementation(async (id: number) => val);
      const userPayload = await userRepo.getById(1);

      const orderPayload = await orderRepo.getSomething();

      const result = await userService.getById(userPayload.id);
      expect(result).toEqual({ user: userPayload, orders: orderPayload });
    });
  });
});
