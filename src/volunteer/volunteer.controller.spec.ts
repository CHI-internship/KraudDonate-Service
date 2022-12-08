import { AwsService, PrismaService } from '../services';
import VolunteerRepository from './repository/volunteer.repository';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import * as Queue from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';

describe('CatsController', () => {
  let volunteerService;
  let volunteerController;

  beforeEach(() => {
    const queue = new Queue('volunteers_request');
    volunteerService = new VolunteerService(
      new VolunteerRepository(new PrismaService()),
      new AwsService(),
      queue,
    );
    volunteerController = new VolunteerController(volunteerService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const inputRequest: GetVolunteerDto = {
        country: 'Ukraine',
        city: 'Kyiv',
        document: 'base64string',
        cardNumber: '1111111111111111111',
        expansion: 'pdf',
        userId: 1,
      };
      const result = ['test'];
      jest
        .spyOn(volunteerService, 'requestForGetVolunteer')
        .mockImplementation(() => result);

      expect(
        await volunteerController.requestForGetVolunteer(inputRequest),
      ).toBe(result);
    });
  });
});
