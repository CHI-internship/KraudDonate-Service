import { BadRequestException, Injectable } from '@nestjs/common';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
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
    if (requestFromDb?.status) {
      throw new BadRequestException(
        'Hello friend you have already become volunteer',
      );
    }
    const oldDocument = requestFromDb?.document;

    if (requestFromDb) {
      await this.volunteerRepository.deleteRequest(requestFromDb.id);
    }

    if (volunteerRequest.document) {
      volunteerRequest.document = await this.awsService
        .uploadFile(
          volunteerRequest.document,
          volunteerRequest.expansion,
          AwsBucketFolders.DOCUMENTS,
        )
        .then(async (data) => {
          if (oldDocument) await this.awsService.deleteFile(oldDocument);
          return data;
        });
    }

    const sevenDaysToMs = 604800000;
    const request = await this.volunteerRepository
      .createRequest(volunteerRequest)
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
