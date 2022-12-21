import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService, AwsService } from '../services';
import VolunteerRepository from './repository/volunteer.repository';
import { BullModule } from '@nestjs/bull';
import { VolunteerConsumer } from './volunteer.processor';
import { VolunteerRequestModule } from '../admin/volunteer-requests/volunteer-request.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'volunteers_request',
    }),
    VolunteerRequestModule,
  ],
  providers: [
    VolunteerService,
    PrismaService,
    VolunteerRepository,
    AwsService,
    VolunteerConsumer,
  ],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
