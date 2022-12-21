import { BadRequestException, Injectable } from '@nestjs/common';
import HttpService from 'src/utils/http/http.service';
import { AdminService } from '../services/admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private readonly httpService: HttpService,
  ) {}

  async loginAdmin(adminPayload: LoginAdminDto) {
    const admin = await this.adminService.getAdminByEmail(adminPayload.email);
    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const res = await this.httpService.adminSignIn(adminPayload);

    return res.data;
  }
}
