import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import UserRepository from './repository/user.repository';
import { AuthHandleService, AwsService, PrismaService } from '../services';

@Module({
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [
    UserService,
    PrismaService,
    JwtService,
    RolesGuard,
    UserRepository,
    AuthHandleService,
    AwsService,
  ],
})
export class UserModule {}
