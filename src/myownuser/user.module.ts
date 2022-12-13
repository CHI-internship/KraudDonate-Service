import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import UserRepository from './repository/user.repository';
import OrderRepository from './repository/order.repository';
import { PrismaService } from '../services';

@Module({
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [UserService, PrismaService, UserRepository, OrderRepository],
})
export class UserModule {}
