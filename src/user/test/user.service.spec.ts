import { Test } from '@nestjs/testing';
import { AwsService, PrismaService } from 'src/services';
import { MockAwsService } from '../../services/mocks';
import UserRepository from '../repository/user.repository';
import { UserService } from '../user.service';
import { UserMatchingObject, userMock } from './user-mock';

describe('UserService', () => {
  let userService: UserService;
  const prismaService = new PrismaService();

  beforeAll(async () => {
    await prismaService.user
      .create({
        data: {
          email: userMock().email,
          name: userMock().name,
          lastname: userMock().lastname,
          role: userMock().role,
        },
      })
      .catch(() => {
        return;
      });
  }, 10000);

  afterAll(async () => {
    await prismaService.user.delete({ where: { email: 'newemail@gmail.com' } });
    await prismaService.$disconnect();
  }, 10000);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, UserRepository, AwsService, PrismaService],
    })
      .overrideProvider(AwsService)
      .useClass(MockAwsService)
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    jest.useRealTimers();
    jest.clearAllMocks();
  }, 30000);

  describe('getByEmail', () => {
    test('call userService.getByEmail', async () =>
      await userService
        .getByEmail(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));

    test('call userService.getByEmail (unexisting email)', async () =>
      await userService
        .getByEmail('unexisting@gmail.com')
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });

  describe('getByEmailWithVolunteerAndOrder', () => {
    test(
      'call userService.getByEmailWithVolunteerAndOrder',
      async () =>
        await userService
          .getByEmailWithVolunteerAndOrder(userMock().email)
          .then((data) =>
            expect(data).toMatchObject({
              ...UserMatchingObject,
              orders: [],
            }),
          ),
      20000,
    );

    test(
      'call userService.getByEmailWithVolunteerAndOrder (unexisting email)',
      async () =>
        await userService
          .getByEmailWithVolunteerAndOrder('unexisting@gmail.com')
          .then((data) =>
            expect(data).toMatchObject({
              ...UserMatchingObject,
              orders: [],
            }),
          )
          .catch((err) => expect(err).rejects),
      20000,
    );
  });

  describe('create', () => {
    const createUserDto = {
      email: 'newemail@gmail.com',
      name: 'name',
      lastname: 'lastname',
      password: 'password',
    };

    test(
      'call userService.create',
      async () =>
        await userService
          .create(createUserDto)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );

    test(
      'call userService.create (existing email)',
      async () =>
        await userService
          .create({ ...createUserDto, email: userMock().email })
          .then((data) => expect(data).toMatchObject(UserMatchingObject))
          .catch((err) => expect(err).rejects),
      20000,
    );
  });

  describe('getUserById', () => {
    test('call userService.getUserById', async () =>
      await userService
        .getUserById(userMock().id)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));
  });

  describe('userIsVolunteer', () => {
    test('call userService.userIsVolunteer', async () =>
      await userService
        .userIsVolunteer(userMock().id)
        .then((data) => expect(data).toEqual(expect.any(Boolean))));
  });

  describe('updateUser', () => {
    const updateUserPayload = { name: 'newname', lastname: 'newlastname' };

    test(
      'call userService.update',
      async () =>
        await userService
          .updateUser(updateUserPayload, userMock().id)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );

    test(
      'call userService.update photo',
      async () =>
        await userService
          .updateUser({ image: 'newimage' }, userMock().id)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );
  });

  describe('delete', () => {
    test('call userService.delete photo', async () =>
      await userService
        .delete(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));
  });
});
