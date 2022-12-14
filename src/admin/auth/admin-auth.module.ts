import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import Http from '../../utils/http/http';
import HttpService from '../../utils/http/http.service';
import { AdminService } from '../services/admin.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';

@Module({
  imports: [],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, PrismaService, AdminService, HttpService, Http],
})
export class AdminAuthModule {}
