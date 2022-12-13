import { BadRequestException } from '@nestjs/common';
import Repository from '../../repository/repository';
import { IUserRepo } from './interface';

export default class UserRepository extends Repository implements IUserRepo {
  async getById(id: number) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return user;
  }
}
