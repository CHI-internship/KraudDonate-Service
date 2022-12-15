import Repository from '../../repository/repository';
import { GetVolunteerDto } from '../dto/get-Volunteer.dto';
import { BadRequestException } from '@nestjs/common';
import IVolunteerRepository from './interface';

export default class VolunteerRepository
  extends Repository
  implements IVolunteerRepository
{
  async getRequestById(userId: number) {
    return this.prismaService.volunteer_activation_request
      .findFirst({
        where: {
          userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createRequest(volunteerRequest: GetVolunteerDto) {
    return this.prismaService.volunteer_activation_request
      .create({
        data: {
          country: volunteerRequest.country,
          city: volunteerRequest.city,
          card_number: volunteerRequest.cardNumber,
          document: volunteerRequest.document,
          userId: volunteerRequest.userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async deleteRequest(id: number) {
    await this.prismaService.volunteer_activation_request
      .delete({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
