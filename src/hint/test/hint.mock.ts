import { IHint } from '../../types';

export const hintMock = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 2,
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
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
