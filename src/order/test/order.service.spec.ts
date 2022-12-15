import { OrderService } from '../order.service';
import OrderRepository from '../repository/order.repository';
import { OrderExample, AllOrdersResponse, userMock } from './order-mock';
import { MockAwsService } from '../../services';
import { Test } from '@nestjs/testing';
import { AwsService, PrismaService } from '../../services';
import {
  MockOrderRepository,
  orderMock,
} from '../repository/order.repository.mock';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UserService } from '../../user/user.service';
import { UserModule } from '../../user/user.module';

describe('OrderService', () => {
  let orderService: OrderService;
  let userService: UserService;
  const mockPrismaService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrderService, OrderRepository, AwsService, PrismaService],
      imports: [UserModule],
    })
      .overrideProvider(OrderRepository)
      .useClass(MockOrderRepository)
      .overrideProvider(AwsService)
      .useClass(MockAwsService)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    orderService = moduleRef.get<OrderService>(OrderService);
    userService = moduleRef.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  describe('Get orders', () => {
    test('Return all orders', async () => {
      await orderService
        .getAllOrders(10, 'asc', 1, '')
        .then((data) => expect(data).toMatchObject(AllOrdersResponse))
        .catch((err) => console.log(err));
    });
    test('Return order by id', async () => {
      await orderService.getOrderById(orderMock().id).then((data) => {
        expect(data).toMatchObject(OrderExample);
        expect(data?.id).toEqual(orderMock().id);
        expect(
          data?.status === 'open' || data?.status === 'closed',
        ).toBeTruthy();
      });
    });
    test('Return order owned by user', async () => {
      await orderService
        .getUserOrder(orderMock().id, 'someemail@gmail.com')
        .then((data) => {
          expect(data).toMatchObject(OrderExample);
          expect(data?.id).toEqual(orderMock().id);
        });
    });
  });

  describe('Create order', () => {
    let orderPayload: CreateOrderDto;

    beforeAll(async () => {
      const { title, info, photo, goal_amount, short_info, finished_at } =
        orderMock();
      orderPayload = {
        title: title,
        info: info,
        photo: photo,
        goal_amount: goal_amount,
        short_info: short_info,
        finished_at: finished_at.toISOString(),
      };
    });
    test('Create order (volunteer exist)', async () => {
      const result: any = userMock();

      jest.spyOn(userService, 'getByEmail').mockImplementation(() => result);

      await orderService
        .createOrder(orderPayload, result.email)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
    test('Create order (unexisting volunteer)', async () => {
      const result: any = '';

      jest.spyOn(userService, 'getByEmail').mockImplementation(() => result);

      await orderService
        .createOrder(orderPayload, 'unexistingmail@gmail.com')
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => expect(err).rejects);
    });
  });

  describe('Update order', () => {
    test('Update order', async () => {
      const { info, goal_amount, photo } = orderMock();
      const orderUpdatePayload = {
        info: info,
        goal_amount: goal_amount,
        photo: photo,
      };
      await orderService
        .updateOrder(orderUpdatePayload, 1)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
  });
});
