import { Volunteer_activation_request } from '@prisma/client';
import { CreateRequestDto } from '../dto/create-request.dto';

export default interface IVolunteerRepository {
  getRequestById(userId: number): Promise<Volunteer_activation_request | null>;
  createRequest(
    volunteerRequest: CreateRequestDto,
  ): Promise<Volunteer_activation_request>;
  deleteRequest(id: number): Promise<void>;
}
