import { Role } from '@prisma/client';

const val = {
  id: 1,
  email: 'Arvid_Beer@hotmail.com',
  name: 'newname',
  lastname: 'newlastname',
  role: Role.customer,
  photo: 'file location',
  createdAt: new Date(),
  updatedAt: new Date(),
  volunteer: null,
  // orders: [
  //   {
  //     id: 1,
  //     title: 'Soap',
  //     info: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
  //     user_id: 1,
  //     photo: 'https://loremflickr.com/640/480/business',
  //     goal_amount: 387.08,
  //     sum: 0.85,
  //     short_info:
  //       'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
  //     finished_at: '2023-06-30T09:57:31.115Z',
  //     status: 'open',
  //     createdAt: '2022-11-20T19:04:37.498Z',
  //     updatedAt: '2022-11-20T19:04:37.498Z',
  //   },
  // ],
};

export default val;
