import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { VolunteerModule } from './volunteer.module';
import { Volunteer_activation_request } from '@prisma/client';
import { PrismaService } from '../services';
import { faker } from '@faker-js/faker';

describe('Volunteer', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  const payload = {
    country: faker.address.country(),
    city: faker.address.city(),
    documents: [faker.internet.avatar()],
    cardNumber: faker.finance.creditCardNumber(),
    userId: 1,
  };
  const payload2 = {
    country: faker.address.country(),
    city: faker.address.city(),
    documents: [faker.internet.avatar()],
    cardNumber: faker.finance.creditCardNumber(),
    userId: 2,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VolunteerModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prismaService = new PrismaService();

    // Update the entities in the database to restore the initial state
    await prismaService.volunteer_activation_request.upsert({
      where: {
        userId: 2,
      },
      create: {
        country: payload2.country,
        city: payload2.city,
        documents: [
          'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/6afa0386-0727-436d-bc90-bf3f2e907631.pdf',
        ],
        card_number: payload2.cardNumber,
        userId: 2,
        status: 'approved',
      },
      update: {
        status: 'approved',
      },
    });
    await prismaService.volunteer_activation_request.upsert({
      where: {
        userId: 1,
      },
      create: {
        country: 'Ukraine',
        city: 'Kyiv',
        documents: [
          'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/6afa0386-0727-436d-bc90-bf3f2e907631.pdf',
        ],
        card_number: '1111111111111111111',
        userId: 1,
        status: 'rejected',
      },
      update: {
        status: 'rejected',
      },
    });

    await prismaService.$disconnect();
  });

  it(`Post /volunteer with status null or false`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send(payload)
      .expect(201)
      .expect((res) => {
        const { cardNumber, ...result } = payload;
        expect(res.body).toMatchObject<Volunteer_activation_request>({
          ...result,
          id: expect.any(Number),
          documents: [expect.any(String)],
          card_number: payload.cardNumber,
          status: expect.any(String),
        });
      });
  });

  it(`Post /volunteer with missing property`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send({
        country: faker.address.country(),
        city: faker.address.city(),
        documents: [
          {
            base64File: faker.internet.avatar(),
            ext: faker.internet.avatar(),
          },
        ],
        cardNumber: faker.finance.creditCardNumber(),
      })
      .expect(400);
  });

  it(`Post /volunteer with status true`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send(payload2)
      .expect(400)
      .expect((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Hello friend you have already become volunteer',
        });
      });
  });

  afterAll(async () => {
    await prismaService.volunteer_activation_request.deleteMany({
      where: {
        userId: {
          in: [1, 2],
        },
      },
    });
    await app.close();
  });
});
