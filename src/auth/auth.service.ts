import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import HttpService from 'src/utils/http/http.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthHandleService } from '../services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authHandleService: AuthHandleService,
    private readonly httpService: HttpService,
  ) {}

  async register(user: CreateUserDto) {
    const registeredUser = await this.userService.getByEmail(user.email);
    if (registeredUser) throw new BadRequestException('Something wrong');

    delete user.recaptchaToken;
    const createdUser = await this.userService.create(user);
    try {
      const res = await this.httpService.signUp(
        user.email,
        user.password,
        createdUser.role,
      );

      return res.data;
    } catch (err) {
      const res = await this.userService.delete(user.email);
      throw err;
    }
  }

  async login(credentials: LoginUserDto) {
    const registeredUser = await this.userService.getByEmail(credentials.email);
    if (!registeredUser) {
      throw new BadRequestException('Something wrong');
    }

    delete credentials.recaptchaToken;
    try {
      const res = await this.httpService.signIn(credentials);

      return res.data;
    } catch (err) {
      throw new BadRequestException('Invalid email or password');
    }
  }

  async refreshTokens(rawRefreshToken: RefreshTokenDto) {
    const { refreshToken } = rawRefreshToken;
    const { email, role } = this.authHandleService.getPayload(refreshToken);
    const res = await this.httpService.refreshToken(email, role);

    return res.data;
  }
}
