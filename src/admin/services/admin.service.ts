import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  getAdminByEmail(email: string) {
    return this.prismaService.admin.findFirst({
      where: { email },
    });
  }
}
