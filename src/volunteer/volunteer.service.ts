import { BadRequestException, Injectable } from '@nestjs/common';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';

@Injectable()
export class VolunteerService {
  constructor(
    private volunteerRepository: VolunteerRepository,
    private awsService: AwsService,
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
    return this.volunteerRepository.createRequest(volunteerRequest);
  }
}
