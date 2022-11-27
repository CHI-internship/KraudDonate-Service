import { Module } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { VolunteerRequestsController } from './volunteer-requests.controller';
import { PrismaService, AwsService } from 'src/services';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';
import UserRepository from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [VolunteerRequestsController],
  providers: [
    VolunteerRequestsService,
    PrismaService,
    VolunteerRequestsRepository,
    UserRepository,
    UserService,
    AwsService,
    JwtService,
  ],
})
export class VolunteerRequestModule {}
