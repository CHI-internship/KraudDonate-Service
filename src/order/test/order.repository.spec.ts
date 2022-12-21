import { Test } from '@nestjs/testing';
import { OrderFiltersType } from '../../types/order-filters.type';
import { OrderStatusEnum } from '../../types/order-status.enum';
import { PrismaService } from '../../services';
import { CreateOrderDto } from '../dto/create-order.dto';
import OrderRepository from '../repository/order.repository';
import { orderMock } from '../repository/order.repository.mock';
import { AllOrdersResponse, OrderExample, userMock } from './order-mock';

describe('OrderRepository', () => {
  let orderRepo: OrderRepository;
  const prismaService = new PrismaService();
  const OrderIdsToDelete: number[] = [];
  let UserIdToDelete: number;

  beforeAll(async () => {
    await prismaService.user
      .create({
        data: {
          email: userMock().email,
          name: userMock().name,
          lastname: userMock().lastname,
          role: userMock().role,
        },
      })
      .then((data) => (UserIdToDelete = data.id))
      .catch((err) => {
        console.log(err);
        return;
      });
    await prismaService.order
      .create({
        data: {
          title: orderMock().title,
          info: orderMock().info,
          user_id: UserIdToDelete,
          photo: orderMock().photo,
          goal_amount: orderMock().goal_amount,
          short_info: orderMock().short_info,
          finished_at: new Date(orderMock().finished_at).toISOString(),
        },
      })
      .then((data) => OrderIdsToDelete.push(data.id))
      .catch((err) => {
        console.log(err);
        return;
      });
  });
  afterAll(async () => {
    await prismaService.order
      .deleteMany({
        where: {
          id: {
            in: OrderIdsToDelete,
          },
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    await prismaService.user.delete({
      where: {
        id: UserIdToDelete,
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
      const params: OrderFiltersType = {
        page: 1,
        limit: 10,
        sort: 'asc',
        sortBy: '',
        search: '',
        status: 'open' as OrderStatusEnum,
      };
      const orderByCase = {};
      await orderRepo
        .getAllOrders(params, orderByCase)
        .then((data) => expect(data).toMatchObject(AllOrdersResponse))
        .catch((err) => console.log(err));
    });
    test('Return order by id', async () => {
      await orderRepo
        .getOrderById(OrderIdsToDelete[0])
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
    test('Return oder owned by user', async () => {
      await orderRepo
        .getUserOrder(OrderIdsToDelete[0], userMock().email)
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
  });
  describe('Create order', () => {
    const { title, info, photo, goal_amount, short_info, finished_at } =
      orderMock();
    const orderPayload: CreateOrderDto = {
      title: title,
      info: info,
      photo: photo,
      goal_amount: goal_amount,
      short_info: short_info,
      finished_at: finished_at.toISOString(),
    };

    test('Create order', async () => {
      await orderRepo
        .createOrder(orderPayload, UserIdToDelete)
        .then((data) => {
          OrderIdsToDelete.push(data.id);
          expect(data).toMatchObject(OrderExample);
        })
        .catch((err) => console.log(err));
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
      await orderRepo
        .updateOrder(orderUpdatePayload, OrderIdsToDelete[0])
        .then((data) => expect(data).toMatchObject(OrderExample))
        .catch((err) => console.log(err));
    });
  });
});
