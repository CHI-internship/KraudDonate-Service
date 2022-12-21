import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../user.module';
import { UserMatchingObject } from './user-mock';
import { AuthHandleService, AwsService, PrismaService } from '../../services';
import { MockAuthHandleService, MockAwsService } from '../../services/mocks';
import { userMock } from '../repository/user.repository.mock';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('User', () => {
  let app: INestApplication;
  let newUserId: number;

  const prismaService = new PrismaService();
  const mockGuard = jest.fn().mockImplementation(() => true);

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
      .then((user) => (newUserId = user.id))
      .catch(() => {
        return;
      });

    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(AwsService)
      .useClass(MockAwsService)
      .overrideProvider(AuthHandleService)
      .useClass(MockAuthHandleService)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await prismaService.user
      .delete({ where: { email: userMock().email } })
      .catch(() => {
        return;
      });
    await prismaService.$disconnect();
    await app.close();
  }, 30000);

  describe('/user', () => {
    it('Get /user', async () => {
      const res = await request(app.getHttpServer())
        .get('/user')
        .send(userMock().email);

      expect(res.status).toBe(200);
      expect({
        ...res.body,
        updatedAt: new Date(res.body.updatedAt),
        createdAt: new Date(res.body.createdAt),
      }).toMatchObject(UserMatchingObject);
    });

    it('Get /user/attach', async () => {
      const res = await request(app.getHttpServer())
        .get('/user/attach')
        .send(userMock().email);

      expect(res.status).toBe(200);
      expect({
        ...res.body,
        orders: [],
        updatedAt: new Date(res.body.updatedAt),
        createdAt: new Date(res.body.createdAt),
      }).toMatchObject(UserMatchingObject);
    });

    it('Patch /user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'new', lastname: 'new' };
      const res = await request(app.getHttpServer())
        .patch('/user')
        .send(updateUserDto);

      expect(res.status).toBe(200);
      expect({
        ...res.body,
        updatedAt: new Date(res.body.updatedAt),
        createdAt: new Date(res.body.createdAt),
      }).toMatchObject(UserMatchingObject);
    });

    it('Patch /user with photo', async () => {
      const updateUserDto: UpdateUserDto = { image: 'new' };
      const res = await request(app.getHttpServer())
        .patch('/user')
        .send(updateUserDto);

      expect(res.status).toBe(200);
      expect({
        ...res.body,
        updatedAt: new Date(res.body.updatedAt),
        createdAt: new Date(res.body.createdAt),
      }).toMatchObject(UserMatchingObject);
    });

    it('Get /user/role-check', async () => {
      const res = await request(app.getHttpServer())
        .get('/user/role-check')
        .query({ id: newUserId });

      expect(res.status).toBe(200);
      expect(res.text).toEqual(expect.any(String));
    });
  });
});
