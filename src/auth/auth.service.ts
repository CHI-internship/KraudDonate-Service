import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { IHttpService } from 'src/utils/http/http.interface';
import HttpService from 'src/utils/http/http.service';

@Injectable()
export class AuthService {
  private readonly httpService: IHttpService;
  constructor(
    private readonly userService: UserService,
  ) {
    this.httpService = new HttpService(process.env.AUTH_SERVICE_URL!);
  }

  async register(user: CreateUserDto) {
    const registeredUser = await this.userService.getByEmail(user.email);
    
    if (registeredUser) {
      throw new BadRequestException('Something wrong');
    }
  
    const createdUser = await this.userService.create(user);
   
    try {
      const res = await this.httpService.post('/auth/signup', {email: user.email, password: user.password, role: createdUser.role})

      return res.data;
    } catch (err) {
      const res = await this.userService.delete(user.email);
      throw new BadRequestException(err.response.data.message);
    }
  }

  async login(credentials: LoginUserDto) {
    const registeredUser = await this.userService.getByEmail(credentials.email);

    if (!registeredUser) {
      throw new BadRequestException('Something wrong');
    }

    try {
      const res = await this.httpService.post('/auth/signin', credentials);
   
      return res.data;
    } catch (err) {
      throw new BadRequestException('Invalid email or password');
    }
  }
}
