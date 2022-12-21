import { BadRequestException } from '@nestjs/common';
import { CreateRequestDto } from '../dto/create-request.dto';
import Repository from '../../repository/repository';
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

  async createRequest(volunteerRequest: CreateRequestDto) {
    return this.prismaService.volunteer_activation_request
      .create({
        data: {
          country: volunteerRequest.country,
          city: volunteerRequest.city,
          card_number: volunteerRequest.cardNumber,
          documents: volunteerRequest.documents,
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
