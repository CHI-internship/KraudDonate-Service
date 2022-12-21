import { Injectable } from '@nestjs/common';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { UserService } from '../../user/user.service';
import { REJECTED_TEMP } from '../../templates/rejected-request';
import { VolunteerRequestStatus } from 'src/types';
import { MailService } from '../../utils/mail/mail.service';

@Injectable()
export class VolunteerRequestsService {
  constructor(
    private volunteerRequestsRepository: VolunteerRequestsRepository,
    private mailService: MailService,
    private userService: UserService,
  ) {}

  async getRequests() {
    return this.volunteerRequestsRepository.getRequests();
  }

  async getRequestById(id: number) {
    return this.volunteerRequestsRepository.getRequestById(id);
  }

  async changeRequestStatus(changeRequestStatusPayload: ApproveRequestDto) {
    if (changeRequestStatusPayload.status == VolunteerRequestStatus.REJECTED) {
      const user = await this.userService.getUserById(
        changeRequestStatusPayload.userId,
      );
      if (user) {
        await this.mailService.sendEmail(
          user.email,
          'Rejected request',
          REJECTED_TEMP(user.name, changeRequestStatusPayload.message),
        );
      }
      return this.volunteerRequestsRepository.changeRequestStatus(
        changeRequestStatusPayload,
      );
    }
  }
}
