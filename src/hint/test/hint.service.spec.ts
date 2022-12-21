import { Test, TestingModule } from '@nestjs/testing';
import { HintService } from '../hint.service';
import { UserService } from '../../user/user.service';
import HintMockRepository from '../repository/hint.mock.repository';
import HintRepository from '../repository/hint.repository';
import { HintMatchingObject, hintMock } from './hint.mock';
import { PrismaService } from '../../services';
import { userMock } from '../../user/repository/user.repository.mock';

describe('Hint Service', () => {
  let hintService: HintService;

  const UserMockService = {
    getByEmail: jest.fn().mockImplementation(() => userMock()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HintRepository, HintService, UserService, PrismaService],
    })
      .overrideProvider(HintRepository)
      .useClass(HintMockRepository)
      .overrideProvider(UserService)
      .useValue(UserMockService)
      .compile();

    hintService = module.get<HintService>(HintService);
  });

  describe('Get All Hints', () => {
    test('should find all hints', async () => {
      const data = await hintService.getAllHints(10, 'asc', 1, '');
      expect(data.data[0]).toMatchObject(HintMatchingObject);
    });
  });

  describe('GetHintById', () => {
    test('should find a existing hint', async () => {
      expect(await hintService.getHintById(hintMock().id)).toMatchObject(
        HintMatchingObject,
      );
    });
  });

  describe('Create hint', () => {
    const hint = {
      title: 'new title',
      info: 'new info',
    };
    const email = 'Arvid_Beer@hotmail.com';
    test('should create hint', async () => {
      const newHint = await hintService.createHint(hint, email);
      expect(newHint).toMatchObject(HintMatchingObject);
    });
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'update title',
      info: 'update info',
    };
    test('should create hint', async () => {
      const updateHint = await hintService.updateHintById(hintMock().id, hint);
      expect(updateHint).toMatchObject(HintMatchingObject);
    });
  });
});
