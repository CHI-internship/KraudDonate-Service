import { IGetOrdersRes, IOrder, IUser } from '../../types';

export const userMock = (): IUser => {
  return {
    id: 1,
    email: 'ordertesting@gmail.com',
    name: 'Test',
    lastname: 'Order',
    role: 'volunteer',
    photo: 'photo',
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
  };
};

export const OrderExample: IOrder = {
  id: expect.any(Number),
  title: expect.any(String),
  info: expect.any(String),
  user_id: expect.any(Number),
  photo: expect.any(String),
  goal_amount: expect.any(Number),
  sum: expect.any(Number),
  short_info: expect.any(String),
  finished_at: expect.any(Date),
  status: expect.any(String),
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const AllOrdersResponse: IGetOrdersRes = {
  page: expect.any(Number),
  limit: expect.any(Number),
  totalPages: expect.any(Number),
  data: expect.any(Array),
};
