import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { IHint } from './hint.types';
import { IOrder } from './order.types';

export interface IUser {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: 'customer' | 'volunteer';
  photo: string | null;
  orders?: IOrder[] | [];
  createdAt: Date;
  updatedAt: Date;
  volunteer_hints?: IHint[] | [];
}

export interface IUserRerository {
  update(updateUserDto: UpdateUserDto, userId: number): Promise<IUser | null>;
  getById(id: number): Promise<IUser | null>;
  getByEmail(email: string): Promise<IUser | null>;
  getByEmailWithVolunteerAndOrder(email: string): Promise<IUser | null>;
  delete(email: string): Promise<IUser | null>;
  create(user: CreateUserDto): Promise<IUser | null>;
}
