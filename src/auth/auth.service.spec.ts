import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthHandleService, AwsService, PrismaService } from '../services';
import HttpService from '../utils/http/http.service';
import {
  AuthHandleServiceMock,
  getPayloadMock,
} from './__mocks__/auth-handle.service.mock';
import UserRepository from '../user/repository/user.repository';
import { BadRequestException } from '@nestjs/common';
import HttpMockService from '../utils/http/http.service.mock';
import { MockUserRepository } from '../user/repository/user.repository.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let httpService: HttpService;
  let userRepository: UserRepository;
  process.env.ALGORITM_DECODE_PASSWORD = 'sha256';
  // const prismaService = new PrismaService();

  const createUserDataPayload = {
    email: 'test@gmail.com',
    name: 'name',
    lastname: 'lastname',
    password: 'Test_123',
  };

  const loginUserDataPayload = {
    email: 'email@gmail.com',
    password: 'Test_123',
  };

  const refreshTokenDataPayload = {
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
      .overrideProvider(HttpService)
      .useClass(HttpMockService)
      .overrideProvider(AuthHandleService)
      .useClass(AuthHandleServiceMock)
      .overrideProvider(UserRepository)
      .useClass(MockUserRepository)
      .compile();

    authService = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  // afterEach(async () => {
  //   const user = await prismaService.user.findUnique({
  //     where: { email: createUserDataPayload.email },
  //   });
  //   if (user) {
  //     await prismaService.user.delete({
  //       where: {
  //         email: createUserDataPayload.email,
  //       },
  //     });
  //   }
  //   await prismaService.$disconnect();
  // });

  describe('Login', () => {
    it('should return access and refresh tokens', async () => {
      const result = await authService.login(loginUserDataPayload);

      const expectedResult = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException "Something wrong", when user not found', async () => {
      jest
        .spyOn(userRepository, 'getByEmail')
        .mockImplementation(async () => null);

      await expect(authService.login(loginUserDataPayload)).rejects.toEqual(
        new BadRequestException('Something wrong'),
      );
    });

    it('should throw BadRequestException "Invalid email or password"', async () => {
      jest.spyOn(httpService, 'signIn').mockImplementation(async () => {
        throw new Error();
      });

      await expect(authService.login(loginUserDataPayload)).rejects.toEqual(
        new BadRequestException('Invalid email or password'),
      );
    });
  });

  describe('Registration', () => {
    it('should create user and return access and refresh tokens', async () => {
      jest
        .spyOn(userRepository, 'getByEmail')
        .mockImplementation(async () => null);

      const result = await authService.register(createUserDataPayload);

      const expectedResult = {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException "Something wrong", when user exist', async () => {
      await expect(authService.register(createUserDataPayload)).rejects.toEqual(
        new BadRequestException('Something wrong'),
      );
    });

    it('should throw BadRequestException, when something wrong on auth service', async () => {
      jest.spyOn(httpService, 'signUp').mockImplementation(async () => {
        throw new Error();
      });

      await authService
        .register(createUserDataPayload)
        .catch((err) => expect(err).rejects);
    });
  });

  describe('Refresh', () => {
    it('should return access and refresh tokens', async () => {
      getPayloadMock.mockImplementationOnce(() => ({
        email: 'test@gmail.com',
        role: 'customer',
      }));

      const result = await authService.refreshTokens(refreshTokenDataPayload);

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

      jest.spyOn(httpService, 'refreshToken').mockImplementation(async () => {
        throw new Error();
      });

      await expect(
        authService.refreshTokens(refreshTokenDataPayload),
      ).rejects.toEqual(new BadRequestException('Something wrong'));
    });
  });
});
