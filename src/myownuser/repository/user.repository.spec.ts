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

  const UserMatchingObject = {
    id: 1,
    email: expect.any(String),
    name: expect.any(String),
    lastname: expect.any(String),
    role: expect.any(String),
    photo: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  describe('Unit tests for Repo', () => {
    it('random IT', async () => {
      const user: any = await userRepo.getById(1);

      expect(user).toEqual(UserMatchingObject);
      expect(user).toMatchObject(UserMatchingObject);
    });
  });
});
