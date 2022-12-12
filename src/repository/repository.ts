import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export default abstract class Repository {
  constructor(protected readonly prismaService: PrismaService) {}

  async query(query: string) {
    const data = await this.prismaService.$queryRaw(Prisma.sql`${query}`);

    return data;
  }
}
