import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/services';
import UserRepository from '../repository/user.repository';
import { userMock } from '../repository/user.repository.mock';
import { UserMatchingObject } from './user-mock';

describe('UserRepository', () => {
  let userRepo: UserRepository;
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
    await prismaService.user
      .delete({ where: { email: 'newemail@gmail.com' } })
      .catch(() => {
        return;
      });
    await prismaService.$disconnect();
  }, 10000);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, UserRepository],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    userRepo = moduleRef.get<UserRepository>(UserRepository);
    jest.useRealTimers();
    jest.clearAllMocks();
  }, 30000);

  describe('getByEmail', () => {
    test('call getByEmail', async () =>
      await userRepo
        .getByEmail(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));

    test('call getByEmail (unexisting email)', async () =>
      await userRepo
        .getByEmail('unexisting@gmail.com')
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });

  describe('getByEmailWithVolunteerAndOrder', () => {
    test(
      'call getByEmailWithVolunteerAndOrder',
      async () =>
        await userRepo
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
      'call getByEmailWithVolunteerAndOrder (unexisting email)',
      async () =>
        await userRepo
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
      'call create',
      async () =>
        await userRepo
          .create(createUserDto)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );

    test(
      'call create (existing email)',
      async () =>
        await userRepo
          .create({ ...createUserDto, email: userMock().email })
          .then((data) => expect(data).toMatchObject(UserMatchingObject))
          .catch((err) => expect(err).rejects),
      20000,
    );
  });

  describe('getById', () => {
    test('call getById', async () =>
      await userRepo
        .getById(userMock().id)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));
  });

  describe('update', () => {
    const updateUserPayload = { name: 'newname', lastname: 'newlastname' };

    test(
      'call update',
      async () =>
        await userRepo
          .update(updateUserPayload, userMock().id)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );

    test(
      'call update photo',
      async () =>
        await userRepo
          .update({ image: 'newimage' }, userMock().id)
          .then((data) => expect(data).toMatchObject(UserMatchingObject)),
      20000,
    );
  });

  describe('delete', () => {
    test('call delete', async () =>
      await userRepo
        .delete(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject)));
  });
});
