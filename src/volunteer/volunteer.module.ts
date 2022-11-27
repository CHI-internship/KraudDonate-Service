import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService, AwsService } from 'src/services';
import VolunteerRepository from './repository/volunteer.repository';

@Module({
  providers: [VolunteerService, PrismaService, VolunteerRepository, AwsService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
