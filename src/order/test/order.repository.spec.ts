import { Test } from '@nestjs/testing';
import { PrismaService } from '../../services';
import { CreateOrderDto } from '../dto/create-order.dto';
import OrderRepository from '../repository/order.repository';
import { orderMock } from '../repository/order.repository.mock';
import { AllOrdersResponse, OrderExample, userMock } from './order-mock';

describe('OrderRepository', () => {
  let orderRepo: OrderRepository;
  const prismaService = new PrismaService();

  beforeAll(async () => {
    await prismaService.user.create({
      data: {
        email: userMock().email,
        name: userMock().name,
        lastname: userMock().lastname,
        role: userMock().role,
      },
    });
    await prismaService.order
      .create({
        data: {
          title: orderMock().title,
          info: orderMock().info,
          user_id: userMock().id,
          photo: orderMock().photo,
          goal_amount: orderMock().goal_amount,
          short_info: orderMock().short_info,
          finished_at: new Date(orderMock().finished_at).toISOString(),
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  });
  afterAll(async () => {
    await prismaService.order
      .deleteMany({
        where: {
          title: orderMock().title,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    await prismaService.user.delete({
      where: {
        email: userMock().email,
      },
    });
    await prismaService.$disconnect();
  });
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrderRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    orderRepo = moduleRef.get<OrderRepository>(OrderRepository);
    jest.clearAllMocks();
  });

  describe('Get orders', () => {
    test('Return all orders', async () => {
      await orderRepo
        .getAllOrders(10, 'asc', 1, '')
        .then((data) => expect(data).toMatchObject(AllOrdersResponse))
        .catch((err) => console.log(err));
    });
    test('Return order by id', async () => {
      await orderRepo
        .getOrderById(orderMock().id)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
    test('Return oder owned by user', async () => {
      const order = await prismaService.order.findFirst({
        where: {
          title: orderMock().title,
        },
      });
      const user = await prismaService.user.findFirst({
        where: {
          id: userMock().id,
        },
      });

      await orderRepo
        .getUserOrder(order!.id, user!.email)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
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
    test('Create order', async () => {
      await orderRepo
        .createOrder(orderPayload, userMock().id)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
  });
  describe('Update order', () => {
    test('Update order', async () => {
      const order = await prismaService.order.findFirst({
        where: {
          title: orderMock().title,
        },
      });
      const { info, goal_amount, photo } = orderMock();
      const orderUpdatePayload = {
        info: info,
        goal_amount: goal_amount,
        photo: photo,
      };
      await orderRepo
        .updateOrder(orderUpdatePayload, order!.id)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
  });
});
