import { Injectable } from '@nestjs/common';
import HttpService from 'src/utils/http/http.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
  constructor(private readonly httpService: HttpService) {}

  forgotPassword(email: string) {
    return this.httpService.forgotPassword(email);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.httpService.resetPassword(resetPasswordDto);
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return this.httpService.updatePassword(updatePasswordDto);
  }
}
