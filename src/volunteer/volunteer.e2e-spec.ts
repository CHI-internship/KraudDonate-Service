import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerModule } from './volunteer.module';

describe('Cats', () => {
  let app: INestApplication;
  const newa = {
    a: 'b',
  };
  const volunteerService = { requestForGetVolunteer: () => newa };
  //   const volunteerService = { requestForGetVolunteer: () => {payload} };
  //   const volunteerService = { };
  const payload = {
    country: 'Ukraine',
    city: 'Kyiv',
    document: 'base64string',
    cardNumber: '1111111111111111111',
    expansion: 'pdf',
    userId: 10,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VolunteerModule],
    })
      //   .overrideProvider(VolunteerService)
      //   .useValue(volunteerService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Post /volunteer`, async () => {
    return (
      request(app.getHttpServer())
        .post('/volunteer')
        .send(payload)
        //   .expect(201)
        .expect((res) => {
          console.log(res.body);
          res.body === volunteerService.requestForGetVolunteer();
        })
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
