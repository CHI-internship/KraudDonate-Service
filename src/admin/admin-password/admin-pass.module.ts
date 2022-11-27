import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { AdminService } from '../services/admin.service';
import { AdminPassController } from './admin-pass.controller';
import { AdminPassService } from './admin-pass.service';

@Module({
  imports: [HttpModule, AdminAuthModule],
  controllers: [AdminPassController],
  providers: [AdminPassService, PrismaService, AdminService],
})
export class AdminPassModule {}
