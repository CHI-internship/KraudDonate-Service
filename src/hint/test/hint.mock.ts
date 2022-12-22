import { IHint } from '../../types';

export const hintMock = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 1,
    createdAt: new Date('2022-12-15 16:41:26.096'),
    hint_photo: [],
  };
};
export const HintMatchingObject = {
  id: expect.any(Number),
  title: expect.any(String),
  info: expect.any(String),
  user_id: expect.any(Number),
  createdAt: expect.any(Date),
};
