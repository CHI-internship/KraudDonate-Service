import { IUser } from './user.types';

export interface IAuthHandleService {
  getPayload(rawToken?: string): IUser | null;
}
