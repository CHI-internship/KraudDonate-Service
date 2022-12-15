import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import HttpService from '../utils/http/http.service';
import Http from '../utils/http/http';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService, HttpService, Http],
  imports: [],
})
export class PasswordModule {}
