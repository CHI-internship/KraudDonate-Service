import { AwsBucketFolders } from '../../types';
import { CreateOrderDto } from '../dto/create-order.dto';

export const orderMock = (): CreateOrderDto => {
  return {
    title: 'Title',
    info: 'Full info',
    photo: 'photo-link',
    goal_amount: 100,
    short_info: 'Short info',
    finished_at: '2018-03-29T13:34:00.000',
  };
};

export const mockId = 1;

export const OrderExample = {
  id: mockId,
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

export const AllOrdersResponse = {
  page: expect.any(Number),
  limit: expect.any(Number),
  totalPages: expect.any(Number),
  data: expect.any(Array),
};

export const MockAwsService = {
  uploadImg: jest.fn(async (base64: string, folder: AwsBucketFolders) =>
    Promise.resolve('file location'),
  ),
  uploadFile: jest.fn(
    async (base64: string, ext: string, folder: AwsBucketFolders) =>
      Promise.resolve('file location'),
  ),
  deleteFile: jest.fn(async (location: string) => {
    return Promise.resolve({ success: true });
  }),
};
