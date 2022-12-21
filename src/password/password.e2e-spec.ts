import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PasswordModule } from './password.module';
import { PasswordService } from './password.service';
import HttpService from '../utils/http/http.service';
import HttpMockService from '../utils/http/http.service.mock';

describe('Password', () => {
  let app: INestApplication;
  let passwordService: PasswordService;
  const payload = {
    email: 'Arvid_Beer@hotmail.com',
  };
  const payload2 = {
    userId: 1,
    newPassword: '12345678',
    oldPassword: '123456789',
  };
  const payload3 = {
    resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    newPassword: '12345678',
    newPasswordConfirm: '12345678',
    recaptchaToken: 'flkadfjdfjfi22ehljfdj',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PasswordModule],
    })
      .overrideProvider(HttpService)
      .useValue(new HttpMockService())
      .compile();

    passwordService = moduleRef.get<PasswordService>(PasswordService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/password/forgot', () => {
    it(`Post /password/forgot`, () => {
      return request(app.getHttpServer())
        .post('/password/forgot')
        .send(payload)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });
  });

  describe('/password/update', () => {
    it(`Patch /password/update`, async () => {
      return request(app.getHttpServer())
        .patch('/password/update')
        .send(payload2)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });
    it(`Patch /password/update with blank payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/update')
        .send({})
        .expect(400);
    });
  });

  describe('/password/reset', () => {
    it(`Patch /password/reset`, () => {
      return request(app.getHttpServer())
        .patch('/password/reset')
        .send(payload3)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });

    it(`Patch /password/reset with blank payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/reset')
        .send({})
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
