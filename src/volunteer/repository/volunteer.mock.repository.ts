import { Volunteer_activation_request } from '@prisma/client';
import Repository from '../../repository/repository';
import { CreateRequestDto } from '../dto/create-request.dto';
import { GetVolunteerDto } from '../dto/get-Volunteer.dto';
import IVolunteerRepository from './interface';

export default class VolunteerMockRepository
  extends Repository
  implements IVolunteerRepository
{
  async getRequestById(
    userId: number,
  ): Promise<Volunteer_activation_request | null> {
    return {
      id: 127,
      country: 'Ukraine',
      city: 'Zaporizhzhia',
      card_number: '123456789101123',
      documents: [
        'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/ad67fd79-48e7-42bf-9a81-8bbf32ad22a3.sTZDl5nNofvL8sU',
      ],
      userId: 1,
      status: 'open',
    };
  }
  async createRequest(
    volunteerRequest: CreateRequestDto,
  ): Promise<Volunteer_activation_request> {
    return {
      id: 127,
      country: 'Ukraine',
      city: 'Zaporizhzhia',
      card_number: '123456789101123',
      documents: [
        'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/ad67fd79-48e7-42bf-9a81-8bbf32ad22a3.sTZDl5nNofvL8sU',
      ],
      userId: 1,
      status: 'open',
    };
  }
  async deleteRequest(id: number): Promise<void> {
    return;
  }

  async query(query: string): Promise<unknown> {
    throw new Error('Method not implemented');
  }
}
