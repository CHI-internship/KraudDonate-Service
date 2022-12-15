import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../services';
import VolunteerRepository from './volunteer.repository';

describe('Test Volunteer Repository', () => {
  let volunteerRepo: VolunteerRepository;
  let prisma: PrismaService;
  let id: number;
  const expectResult = {
    id: expect.any(Number),
    country: expect.any(String),
    city: expect.any(String),
    card_number: expect.any(String),
    document: expect.any(String),
    userId: 1,
    status: null,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, VolunteerRepository],
    }).compile();

    volunteerRepo = moduleRef.get<VolunteerRepository>(VolunteerRepository);
    prisma = new PrismaService();

    const record = await prisma.volunteer_activation_request.upsert({
      create: {
        country: faker.address.country(),
        city: faker.address.city(),
        card_number: faker.finance.creditCardNumber(),
        document: faker.image.dataUri(),
        userId: 1,
      },
      update: {
        country: faker.address.country(),
        city: faker.address.city(),
        card_number: faker.finance.creditCardNumber(),
        document: faker.image.dataUri(),
      },
      where: {
        userId: 1,
      },
    });

    id = record.id;

    await prisma.$disconnect();
  });

  it('Test getRequestById', async () => {
    const request = await volunteerRepo.getRequestById(1);

    expect(request).toEqual(expectResult);
  });

  it('Test getRequestById with unexisting id', async () => {
    const request = await volunteerRepo.getRequestById(0);

    expect(request).toBe(null);
  });

  it('Test createRequest', async () => {
    const data = {
      country: faker.address.country(),
      city: faker.address.city(),
      cardNumber: faker.finance.creditCardNumber(),
      document: faker.image.dataUri(),
      userId: 2,
      expansion: 'pdf',
    };
    const request = await volunteerRepo.createRequest(data);
    const { cardNumber, expansion, ...result } = data;

    expect(request).toEqual({
      ...result,
      card_number: data.cardNumber,
      status: null,
      id: expect.any(Number),
      document: expect.any(String),
    });
  });

  it('Test createRequest with already created id', async () => {
    try {
      const data = {
        country: faker.address.country(),
        city: faker.address.city(),
        cardNumber: faker.finance.creditCardNumber(),
        document: faker.image.dataUri(),
        userId: 2,
        expansion: 'pdf',
      };
      await volunteerRepo.createRequest(data);
      expect(await volunteerRepo.createRequest(data)).toThrow(
        BadRequestException,
      );
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Something went wrong');
    }
  });

  it('Test deleteRequest', async () => {
    const deletedRequest = await volunteerRepo.deleteRequest(id);

    expect(deletedRequest).toBe(void 0);
    expect(deletedRequest).toBe(undefined);
  });

  it('Test deleteRequest with unexisting id', async () => {
    try {
      await volunteerRepo.deleteRequest(0);
      expect(await volunteerRepo.deleteRequest(0)).toThrow(BadRequestException);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Something went wrong');
    }
  });

  afterAll(async () => {
    await prisma.volunteer_activation_request.delete({ where: { userId: 2 } });
  });
});
