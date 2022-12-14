import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { CreateUserSchema, LoginUserSchema } from '../utils/validator/user';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User created' })
  @Post('/sign-up')
  @UsePipes(new AjvValidationPipe(CreateUserSchema))
  async register(@Body() user: CreateUserDto) {
    const tokens = await this.authService.register(user);
    return tokens;
  }

  @ApiResponse({ status: 200, description: 'User signed in' })
  @Post('/sign-in')
  @UsePipes(new AjvValidationPipe(LoginUserSchema))
  async login(@Body() user: LoginUserDto) {
    const tokens = await this.authService.login(user);
    return tokens;
  }

  @ApiResponse({
    status: 200,
    description: 'Return new access and refresh tokens',
  })
  @Post('/refresh-tokens')
  async refreshTokens(@Body() rawRefreshToken: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(rawRefreshToken);
    return tokens;
  }
}
