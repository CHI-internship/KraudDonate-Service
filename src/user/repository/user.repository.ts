import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import Repository from '../../repository/repository';
import { UpdateUserDto } from '../dto/update-user.dto';

export default class UserRepository extends Repository {
  async update({ name, lastname, image }: UpdateUserDto, userId: number) {
    const user = await this.prismaService.user
      .update({
        where: { id: userId },
        data: {
          name: name != null ? name : undefined,
          lastname: lastname != null ? lastname : undefined,
          photo: image != null ? image : undefined,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return user;
  }

  async getById(id: number) {
    const user = await this.prismaService.user
      .findUnique({
        where: { id },
        include: { volunteer: true, orders: true },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return user;
  }

  async getByEmailWithVolunteerAndOrder(email: string) {
    const user = await this.prismaService.user
      .findUnique({
        where: {
          email,
        },
        include: { volunteer: true, orders: true },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return user;
  }

  async delete(email: string) {
    const user = await this.prismaService.user
      .delete({
        where: {
          email,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.prismaService.user
      .create({
        data: {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          photo: user.photo,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    return newUser;
  }
}
