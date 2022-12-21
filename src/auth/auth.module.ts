import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthHandleService, PrismaService } from 'src/services';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AwsService } from 'src/services/aws.service';
import HttpService from '../utils/http/http.service';
import Http from '../utils/http/http';

@Module({
  imports: [HttpModule, JwtModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    AwsService,
    AuthHandleService,
    HttpService,
    Http,
  ],
})
export class AuthModule {}
