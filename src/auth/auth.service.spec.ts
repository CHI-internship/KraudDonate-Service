import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  createMock,
  deleteMock,
  getByEmailMock,
  UserServiceMock,
} from './__mocks__/user.service.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './__mocks__/jwt.service.mock';
import { HttpServiceMock, postMock } from './__mocks__/http.service.mock';
import { AuthHandleService } from '../services';
import HttpService from '../utils/http/http.service';
import { AxiosErrorMock } from './__mocks__/axios-error.mock';
import {
  AuthHandleServiceMock,
  getPayloadMock,
} from './__mocks__/auth-handle.service.mock';

describe('AuthService', () => {
  let authService: AuthService;
  process.env.ALGORITM_DECODE_PASSWORD = 'sha256';

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        AuthHandleService,
        HttpService,
      ],
    })
      .overrideProvider(UserService)
      .useClass(UserServiceMock)
      .overrideProvider(JwtService)
      .useClass(JwtServiceMock)
      .overrideProvider(HttpService)
      .useClass(HttpServiceMock)
      .overrideProvider(AuthHandleService)
      .useClass(AuthHandleServiceMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Login', () => {
    it('should return access and refresh tokens', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
      };

      getByEmailMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'volunteer',
        photo: 'photo',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      postMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.login(loginUserDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException "Something wrong", when user not found', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123',
      };

      getByEmailMock.mockImplementationOnce(async () => undefined);

      postMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      try {
        const res = await authService.login(loginUserDto);
      } catch (err) {
        expect(err.message).toBe('Something wrong');
      }
    });

    it('should throw BadRequestException "Invalid email or password"', async () => {
      const loginUserDto = {
        email: 'test@gmail.com',
        password: 'Test_123456789',
      };

      getByEmailMock.mockImplementationOnce(async () => ({
        email: 'test@gmail.com',
        // hashed Test_123
        password:
          '9bc646e4613a5dd1181d2bb4d82aa8cead379b3404b7c136130a150f00a03e58',
        role: 'customer',
      }));

      postMock.mockImplementationOnce(async () => undefined);

      try {
        const res = await authService.login(loginUserDto);
      } catch (err) {
        expect(err.message).toBe('Invalid email or password');
      }
    });
  });

  describe('Registration', () => {
    it('should create user and return access and refresh tokens', async () => {
      const createUserDto = {
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        password: 'Test_123',
      };

      getByEmailMock.mockImplementationOnce(async () => undefined);

      createMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'customer',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      postMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.register(createUserDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException "Something wrong", when user exist', async () => {
      const createUserDto = {
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        password: 'Test_123',
      };

      getByEmailMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'customer',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      createMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'customer',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      postMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      try {
        const res = await authService.register(createUserDto);
      } catch (err) {
        expect(err.message).toBe('Something wrong');
      }
    });

    it('should throw BadRequestException, when something wrong on auth service', async () => {
      const axiosError = new AxiosErrorMock({
        response: {
          data: {
            message: 'Error',
          },
        },
      });

      const createUserDto = {
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        password: 'Test_123',
      };

      getByEmailMock.mockImplementationOnce(async () => undefined);

      createMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'customer',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      deleteMock.mockImplementationOnce(async () => ({
        id: 1,
        email: 'test@gmail.com',
        name: 'name',
        lastname: 'lastname',
        role: 'customer',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
        updatedAt: new Date('2022-12-09T13:54:37.019Z'),
      }));

      postMock.mockImplementationOnce(async () => {
        throw axiosError.error;
      });

      try {
        const res = await authService.register(createUserDto);
      } catch (err) {
        expect(err.message).toEqual(expect.any(String));
      }
    });
  });

  describe('Refresh', () => {
    it('should return access and refresh tokens', async () => {
      const refreshTokenDto = {
        refreshToken: 'random-refresh-token',
      };

      getPayloadMock.mockImplementationOnce(() => ({
        email: 'test@gmail.com',
        role: 'customer',
      }));

      postMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.refreshTokens(refreshTokenDto);

      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException, when something wrong on auth service', async () => {
      const refreshTokenDto = {
        refreshToken: 'random-refresh-token',
      };

      getPayloadMock.mockImplementationOnce(() => ({
        email: 'test@gmail.com',
        role: 'customer',
      }));

      postMock.mockImplementationOnce(async () => {
        throw new Error('Error');
      });

      const result = await authService
        .refreshTokens(refreshTokenDto)
        .catch((err) => {
          expect(err.message).toEqual(expect.any(String));
        });
    });
  });
});
