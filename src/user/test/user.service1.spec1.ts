import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { AwsService } from 'src/services';
import UserRepository from '../repository/user.repository';
import { PrismaService } from 'src/services';

import val from './val';

describe('Service', () => {
  let userService: UserService;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, AwsService, UserRepository, PrismaService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepo = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('random', () => {
    it('random IT', async () => {
      jest
        .spyOn(userRepo, 'simpleGet')
        .mockImplementation(async (id: number) => val);

      const result = await userService.getUserById(1);
      console.log(result);
      expect(1).toBe(1);
    });
  });
});
