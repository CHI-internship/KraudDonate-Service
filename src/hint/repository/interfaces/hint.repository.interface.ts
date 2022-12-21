import { ICreateHint, IQueryParams, IUpdateHint } from '../../interfaces';
import { IHint, IHints } from '../../../types';

export interface IHintRepository {
  getAllHints(params: IQueryParams): Promise<IHints>;
  getHintById(id: number): Promise<IHint | null>;
  createHint(hint: ICreateHint, userId: number): Promise<IHint>;
  updateHintById(hintId: number, hint: IUpdateHint): Promise<IHint>;
}
