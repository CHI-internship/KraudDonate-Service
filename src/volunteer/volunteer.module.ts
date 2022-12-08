import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService, AwsService } from '../services';
import VolunteerRepository from './repository/volunteer.repository';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'volunteers_request',
    }),
  ],
  providers: [VolunteerService, PrismaService, VolunteerRepository, AwsService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
