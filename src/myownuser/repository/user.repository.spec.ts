import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/services';
import UserRepository from './user.repository';

describe('Service', () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, UserRepository],
    }).compile();

    userRepo = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('Unit tests for Repo', () => {
    it('random IT', async () => {
      const user = await userRepo.getById(1);

      expect(user).toEqual(user);
    });
  });
});
