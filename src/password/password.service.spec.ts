import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import HttpService from '../utils/http/http.service';
import HttpMockService from '../utils/http/http.service.mock';
import { PasswordService } from './password.service';

describe('Test Password Service', () => {
  let passwordService: PasswordService;
  const email = faker.internet.email();
  const resetPasswordData = {
    recaptchaToken: faker.random.word(),
    resetToken: faker.random.word(),
    newPassword: faker.random.numeric(8),
    newPasswordConfirm: faker.random.numeric(8),
  };
  const updatePasswordData = {
    oldPassword: faker.random.numeric(8),
    newPassword: faker.random.numeric(8),
    userId: Number(faker.random.numeric()),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PasswordService, HttpService],
    })
      .overrideProvider(HttpService)
      .useClass(HttpMockService)
      .compile();

    passwordService = moduleRef.get<PasswordService>(PasswordService);
  });

  describe('Test forgotPassword ', () => {
    it(`Test success`, async () => {
      const expectResult = { success: true };
      const res = await passwordService.forgotPassword(email);

      expect(res).toEqual(expectResult);
    });

    it(`Test failure`, async () => {
      const expectResult = { success: false };
      const res = await passwordService.forgotPassword(email);

      expect(res).not.toEqual(expectResult);
      expect(res).not.toEqual({});
      expect(res).not.toEqual('');
    });
  });

  describe('Test resetPassword ', () => {
    it(`Test success`, async () => {
      const expectResult = { success: true };
      const res = await passwordService.resetPassword(resetPasswordData);

      expect(res).toEqual(expectResult);
    });

    it(`Test failure`, async () => {
      const expectResult = { success: false };
      const res = await passwordService.resetPassword(resetPasswordData);

      expect(res).not.toEqual(expectResult);
      expect(res).not.toEqual({});
      expect(res).not.toEqual('');
    });
  });

  describe('Test updatePassword ', () => {
    it(`Test success`, async () => {
      const expectResult = { success: true };
      const res = await passwordService.updatePassword(updatePasswordData);

      expect(res).toEqual(expectResult);
    });

    it(`Test failure`, async () => {
      const expectResult = { success: false };
      const res = await passwordService.updatePassword(updatePasswordData);

      expect(res).not.toEqual(expectResult);
      expect(res).not.toEqual({});
      expect(res).not.toEqual('');
    });
  });
});
