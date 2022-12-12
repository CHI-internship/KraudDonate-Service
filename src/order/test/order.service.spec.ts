import { OrderService } from '../order.service';
import OrderRepository from '../repository/order.repository';
import {
  MockAwsService,
  orderMock,
  OrderExample,
  AllOrdersResponse,
  mockId,
} from './order-mock';
import { Test } from '@nestjs/testing';
import { AwsService, PrismaService } from '../../services';
import { UserModule } from '../../user/user.module';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRep: OrderRepository;
  const mockAwsService = MockAwsService;

  (async function () {
    const order = orderMock();
    const prismaService = new PrismaService();
    await prismaService.order
      .create({
        data: {
          title: order.title,
          info: order.info,
          user_id: mockId,
          photo: order.photo,
          goal_amount: order.goal_amount,
          short_info: order.short_info,
          finished_at: new Date(order.finished_at).toISOString(),
        },
      })
      .catch(() => {
        return;
      });
    await prismaService.$disconnect();
  })();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrderService, OrderRepository, AwsService, PrismaService],
      imports: [UserModule],
    })
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    orderService = moduleRef.get<OrderService>(OrderService);
    orderRep = moduleRef.get<OrderRepository>(OrderRepository);
    jest.clearAllMocks();
  });

  describe('Get all orders', () => {
    test('Service: Return all orders', async () => {
      await orderService
        .getAllOrders(10, 'asc', 1, '')
        .then((data) => expect(data).toMatchObject(AllOrdersResponse));
    });
  });

  describe('Get order by id', () => {
    test('Service: Return order by id', async () => {
      await orderService.getOrderById(mockId).then((data) => {
        expect(data).toMatchObject(OrderExample);
        expect(
          data?.status === 'open' || data?.status === 'closed',
        ).toBeTruthy();
      });
    });
  });

  // describe('Create order', () => {
  //   test('Service: Create order')
  // });
});
