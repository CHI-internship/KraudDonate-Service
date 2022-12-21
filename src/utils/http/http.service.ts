import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { LoginAdminDto } from '../../admin/auth/dto/login-admin.dto';
import { LoginUserDto } from '../../auth/dto/login-user.dto';
import { ResetPasswordDto } from '../../password/dto/reset-password.dto';
import { UpdatePasswordDto } from '../../password/dto/update-password.dto';
import Http from './http';
import { IHttpService } from './interfaces/httpService.interface';

@Injectable()
export default class HttpService implements IHttpService {
  constructor(private http: Http) {}

  forgotPassword(email: string): Promise<any> {
    return this.http
      .post('/password/forgot', { email })
      .then((data) => data.data);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    return this.http
      .patch('/password/reset', resetPasswordDto)
      .then((data) => data.data);
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any> {
    return this.http
      .patch('/password/update', updatePasswordDto)
      .then((data) => data.data);
  }

  signUp(email: string, password: string, role: Role): Promise<any> {
    return this.http.post('/auth/signup', {
      email: email,
      password: password,
      role: role,
    });
  }

  signIn(credentials: LoginUserDto): Promise<any> {
    return this.http.post('/auth/signin', credentials);
  }

  refreshToken(email: string, role: Role): Promise<any> {
    return this.http.post('/auth/refresh-tokens', { email, role });
  }

  adminSignIn(adminPayload: LoginAdminDto): Promise<any> {
    return this.http.post('/admin/auth/sign-in', adminPayload);
  }
}
