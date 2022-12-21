import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import Repository from 'src/repository/repository';
import { IUser, IUserRerository } from 'src/types';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export const userMock = (): IUser => {
  return {
    id: 1,
    email: 'email@gmail.com',
    name: 'name',
    lastname: 'lastname',
    role: 'volunteer',
    photo: null,
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
  };
};

export class MockUserRepository extends Repository implements IUserRerository {
  update(updateUserDto: UpdateUserDto, userId: number) {
    return Promise.resolve(userMock());
  }

  getById(id: number) {
    return Promise.resolve(userMock());
  }

  getByEmail(email: string) {
    return Promise.resolve(userMock());
  }

  getByEmailWithVolunteerAndOrder(email: string) {
    return Promise.resolve({ ...userMock(), orders: [], volunteer_hints: [] });
  }

  delete(email: string) {
    return Promise.resolve(userMock());
  }

  create(user: CreateUserDto) {
    return Promise.resolve(userMock());
  }
}
