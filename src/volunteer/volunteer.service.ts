import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsBucketFolders, VolunteerRequestStatus } from 'src/types';
import { AwsService } from '../services';
import { emitter } from 'src/utils/emitter';

@Injectable()
export class VolunteerService {
  constructor(
    private volunteerRepository: VolunteerRepository,
    private awsService: AwsService,
    @InjectQueue('volunteers_request') private volunterQueue: Queue,
  ) {}

  async requestForGetVolunteer(volunteerRequest: GetVolunteerDto) {
    const requestFromDb = await this.volunteerRepository.getRequestById(
      volunteerRequest.userId,
    );
    if (requestFromDb?.status == VolunteerRequestStatus.APPROVED) {
      throw new BadRequestException(
        'Hello friend you have already become volunteer',
      );
    }

    if (requestFromDb) {
      await this.volunteerRepository.deleteRequest(requestFromDb.id);
    }

    let docsArray: string[] = [];
    if (volunteerRequest.documents) {
      docsArray = await this.awsService.uploadMultipleFiles(
        volunteerRequest.documents,
        AwsBucketFolders.DOCUMENTS,
      );

      if (requestFromDb?.documents) {
        await this.awsService.deleteMultipleFiles(requestFromDb?.documents);
      }
    }

    const sevenDaysToMs = 604800000;
    const request = await this.volunteerRepository
      .createRequest({ ...volunteerRequest, documents: docsArray })
      .then(async (data) => {
        await this.volunterQueue.add('activationRequest', data.id, {
          delay: sevenDaysToMs,
        });
        return data;
      });

    emitter.emit('newRequest', request);
    return request;
  }
}
