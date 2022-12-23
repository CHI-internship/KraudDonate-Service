import HintRepository from './hint.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services';
import {
  HintMatchingObject,
  HintMatchingObjectUpdated,
  hintMock,
} from '../test/hint.mock';

describe('Hint Repository', () => {
  let hintRepository: HintRepository;
  const prismaService = new PrismaService();
  let id: number;

  beforeAll(async () => {
    const hint = await prismaService.volunteer_hint
      .create({
        data: {
          title: hintMock().title,
          info: hintMock().info,
          user_id: hintMock().user_id,
        },
      })
      .catch(() => {
        return;
      });
    id = hint?.id as number;
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
      expect(await hintRepository.getHintById(id)).toMatchObject(
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
      const newHint = await hintRepository.createHint(hint, 1);
      expect(newHint).toMatchObject(HintMatchingObject);
      await prismaService.volunteer_hint.delete({ where: { id: newHint.id } });
    });
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'update title',
      info: 'update info',
    };
    test('should create hint', async () => {
      const updateHint = await hintRepository.updateHintById(id, hint);
      expect(updateHint).toMatchObject(HintMatchingObjectUpdated);
    });
  });

  afterAll(async () => {
    await prismaService.volunteer_hint.delete({ where: { id: id } });
    await prismaService.$disconnect();
  });
});
