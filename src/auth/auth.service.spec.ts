import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './__mocks__/jwt.service.mock';
import {
  HttpServiceMock,
  refreshTokenMock,
  signInMock,
  signUpMock,
} from './__mocks__/http.service.mock';
import { AuthHandleService, AwsService, PrismaService } from '../services';
import HttpService from '../utils/http/http.service';
import {
  AuthHandleServiceMock,
  getPayloadMock,
} from './__mocks__/auth-handle.service.mock';
import UserRepository from '../user/repository/user.repository';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  process.env.ALGORITM_DECODE_PASSWORD = 'sha256';
  const prismaService = new PrismaService();

  const createUserDataMock = {
    email: 'test@gmail.com',
    name: 'name',
    lastname: 'lastname',
    password: 'Test_123',
  };

  const loginUserDataMock = {
    email: 'test@gmail.com',
    password: 'Test_123',
  };

  const refreshTokenDataMock = {
    refreshToken: 'random-refresh-token',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        UserRepository,
        JwtService,
        AuthHandleService,
        HttpService,
        AwsService,
        PrismaService,
      ],
    })
      .overrideProvider(JwtService)
      .useClass(JwtServiceMock)
      .overrideProvider(HttpService)
      .useClass(HttpServiceMock)
      .overrideProvider(AuthHandleService)
      .useClass(AuthHandleServiceMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    const user = await prismaService.user.findUnique({
      where: { email: createUserDataMock.email },
    });
    if (user) {
      await prismaService.user.delete({
        where: {
          email: createUserDataMock.email,
        },
      });
    }
    await prismaService.$disconnect();
  });

  describe('Login', () => {
    it('should return access and refresh tokens', async () => {
      await prismaService.user.create({
        data: {
          email: createUserDataMock.email,
          name: createUserDataMock.name,
          lastname: createUserDataMock.lastname,
        },
      });

      signInMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.login(loginUserDataMock);

      const expectedResult = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException "Something wrong", when user not found', async () => {
      signInMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      await expect(authService.login(loginUserDataMock)).rejects.toEqual(
        new BadRequestException('Something wrong'),
      );
    });

    it('should throw BadRequestException "valid email orsword"', async () => {
      await prismaService.user.create({
        data: {
          email: createUserDataMock.email,
          name: createUserDataMock.name,
          lastname: createUserDataMock.lastname,
        },
      });

      signInMock.mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(authService.login(loginUserDataMock)).rejects.toEqual(
        new BadRequestException('Invalid email or password'),
      );
    });
  });

  describe('Registration', () => {
    it('should create user and return access and refresh tokens', async () => {
      signUpMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.register(createUserDataMock);

      const expectedResult = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException "Something wrong", when user exist', async () => {
      await prismaService.user.create({
        data: {
          email: createUserDataMock.email,
          name: createUserDataMock.name,
          lastname: createUserDataMock.lastname,
        },
      });

      signUpMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      await expect(authService.register(createUserDataMock)).rejects.toEqual(
        new BadRequestException('Something wrong'),
      );
    });

    it('should throw BadRequestException, when something wrong on auth service', async () => {
      signUpMock.mockImplementationOnce(async () => {
        throw new Error();
      });

      await authService
        .register(createUserDataMock)
        .catch((err) => expect(err).rejects);
    });
  });

  describe('Refresh', () => {
    it('should return access and refresh tokens', async () => {
      getPayloadMock.mockImplementationOnce(() => ({
        email: 'test@gmail.com',
        role: 'customer',
      }));

      refreshTokenMock.mockImplementationOnce(async () => ({
        data: {
          accessToken: 'random-access-token',
          refreshToken: 'random-refresh-token',
        },
      }));

      const result = await authService.refreshTokens(refreshTokenDataMock);

      const expectedResult = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException, when something wrong on auth service', async () => {
      getPayloadMock.mockImplementationOnce(() => ({
        email: 'test@gmail.com',
        role: 'customer',
      }));

      refreshTokenMock.mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(
        authService.refreshTokens(refreshTokenDataMock),
      ).rejects.toEqual(new BadRequestException('Something wrong'));
    });
  });
});
