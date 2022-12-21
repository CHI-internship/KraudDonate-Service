import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Body, Controller, Patch, Post, UsePipes } from '@nestjs/common';
import {
  ResetPasswordSchema,
  UpdatePasswordSchema,
} from '../utils/validator/password';
import { AjvValidationPipe } from '../utils/validator/validation';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto.email);
  }

  @Patch('reset')
  @UsePipes(new AjvValidationPipe(ResetPasswordSchema))
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto);
  }

  @Patch('update')
  @UsePipes(new AjvValidationPipe(UpdatePasswordSchema))
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto);
  }
}
