import Repository from '../../repository/repository';
import { IHintRepository } from './interfaces/hint.repository.interface';
import { ICreateHint, IQueryParams, IUpdateHint } from '../interfaces';
import { IHint, IHints } from '../../types';

export default class HintMockRepository
  extends Repository
  implements IHintRepository
{
  async getAllHints(params: IQueryParams): Promise<IHints> {
    return {
      page: 1,
      limit: 10,
      totalPages: 2,
      data: [
        {
          id: 1,
          title: 'title',
          info: 'info',
          user_id: 1,
          createdAt: new Date(),
          hint_photo: [],
        },
      ],
    };
  }

  async getHintById(id: number): Promise<IHint> {
    return {
      id: 1,
      title: 'title',
      info: 'info',
      user_id: 1,
      createdAt: new Date(),
      hint_photo: [],
    };
  }

  async createHint(hint: ICreateHint, userId: number): Promise<IHint> {
    return {
      id: 1,
      title: 'title',
      info: 'info',
      user_id: 1,
      createdAt: new Date(),
      hint_photo: [],
    };
  }

  async updateHintById(hintId: number, hint: IUpdateHint): Promise<IHint> {
    return {
      id: 1,
      title: 'title',
      info: 'info',
      user_id: 1,
      createdAt: new Date(),
      hint_photo: [],
    };
  }
}
