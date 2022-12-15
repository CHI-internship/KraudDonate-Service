import { Volunteer_activation_request } from '@prisma/client';
import { GetVolunteerDto } from '../dto/get-Volunteer.dto';

export default interface IVolunteerRepository {
  getRequestById(userId: number): Promise<Volunteer_activation_request | null>;
  createRequest(
    volunteerRequest: GetVolunteerDto,
  ): Promise<Volunteer_activation_request>;
  deleteRequest(id: number): Promise<void>;
}
