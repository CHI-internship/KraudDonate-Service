import { BadRequestException } from '@nestjs/common';
import { Role } from '@prisma/client';
import Repository from '../../repository/repository';
import { IUserRepo } from './interface';

export default class MockUserRepository
  extends Repository
  implements IUserRepo
{
  async getById(id: number) {
    return {
      id,
      email: 'Arvid_Beer@hotmail.com',
      name: 'newname',
      lastname: 'newlastname',
      role: Role.customer,
      photo: 'file location',
      createdAt: new Date(),
      updatedAt: new Date(),
      volunteer: null,
    };
  }
}
