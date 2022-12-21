import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { VolunteerRequestsService } from 'src/admin/volunteer-requests/volunteer-requests.service';
import { VolunteerRequestStatus } from 'src/types';

@Processor('volunteers_request')
export class VolunteerConsumer {
  constructor(
    private readonly volunteerRequestsService: VolunteerRequestsService,
  ) {}

  @Process('activationRequest')
  async transcode(job: Job<unknown>) {
    await this.volunteerRequestsService.changeRequestStatus({
      userId: Number(job.id),
      status: VolunteerRequestStatus.REJECTED,
      message: 'Please send the activation request again.',
    });
  }
}
