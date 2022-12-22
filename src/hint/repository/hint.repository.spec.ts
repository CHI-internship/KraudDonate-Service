import HintRepository from './hint.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services';
import { HintMatchingObject, hintMock } from '../test/hint.mock';
import { UserMatchingObject } from '../../user/test/user-mock';

describe('Hint Repository', () => {
  let hintRepository: HintRepository;
  const prismaService = new PrismaService();

  beforeAll(async () => {
    await prismaService.volunteer_hint
      .create({
        data: {
          id: hintMock().id,
          title: hintMock().title,
          info: hintMock().info,
          user_id: hintMock().user_id,
        },
      })
      .catch(() => {
        return;
      });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, HintRepository],
    }).compile();

    hintRepository = module.get<HintRepository>(HintRepository);
  });

  describe('Get All Hints', () => {
    const params = {
      limit: 10,
      page: 1,
      sort: 'asc',
      search: '',
    };
    test('should find all hints', async () => {
      const data = await hintRepository.getAllHints(params);
      expect(data.data[0]).toMatchObject(HintMatchingObject);
    });
  });

  describe('GetHintById', () => {
    test('should find a existing hint', async () => {
      expect(await hintRepository.getHintById(hintMock().id)).toMatchObject(
        HintMatchingObject,
      );
    });
  });

  describe('Create hint', () => {
    const hint = {
      title: 'new title',
      info: 'new info',
    };
    test('should create hint', async () => {
      const newHint = await hintRepository.createHint(hint, 5);
      expect(newHint).toMatchObject(HintMatchingObject);
      await prismaService.volunteer_hint.delete({ where: { id: newHint.id } });
    });
  });

  describe('get user by id', () => {
    test('get by id', async () => {
      const user = await prismaService.user.findFirst({
        where: {
          id: 5,
        },
      });
      console.log(user);
      expect(user).toMatchObject(UserMatchingObject);
    });
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'update title',
      info: 'update info',
    };
    test('should update hint', async () => {
      const updateHint = await hintRepository.updateHintById(
        hintMock().id,
        hint,
      );
      expect(updateHint).toMatchObject(HintMatchingObject);
    });
  });

  afterAll(async () => {
    await prismaService.volunteer_hint.delete({
      where: {
        id: hintMock().id,
      },
    });
  });
});
