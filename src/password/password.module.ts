import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService],
  imports: [HttpModule],
})
export class PasswordModule {}
