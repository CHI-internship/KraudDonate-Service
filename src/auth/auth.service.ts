import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from '../services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  async register(user: CreateUserDto) {
    const registeredUser = await this.usersService.getByEmail(user.email);

    if (registeredUser) {
      throw new BadRequestException('Something wrong');
    }

    const createdUser = await this.usersService.create(user);

    try {
      const res = await this.httpService.axiosRef.post(
        `${process.env.AUTH_SERVICE_URL}/signup`,
        {
          ...user,
          role: createdUser.role,
        },
      );

      return res.data;
    } catch (err) {
      const res = await this.usersService.delete(user.email);
      throw new BadRequestException('Something wrong');
    }
  }

  async login(credentials: LoginUserDto) {
    const registeredUser = await this.usersService.getByEmail(
      credentials.email,
    );

    if (!registeredUser) {
      throw new BadRequestException('Something wrong');
    }

    try {
      const res = await this.httpService.axiosRef.post(
        `${process.env.AUTH_SERVICE_URL}/signin`,
        credentials,
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException('Invalid email or password');
    }
  }

  private validateJwt(token) {
    return jwt.verify(token, process.env.PRIVATE_KEY);
  }
}
