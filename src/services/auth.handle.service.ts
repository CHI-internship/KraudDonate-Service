import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthHandleService } from 'src/types/auth-handle-service.interface';

@Injectable()
export class AuthHandleService implements IAuthHandleService {
  constructor(private readonly jwtService: JwtService) {}

  getPayload(rawToken?: string) {
    const token = this.parseToken(rawToken);

    const user = this.jwtService.verify(token, {
      publicKey: process.env.PRIVATE_KEY,
    });

    return user;
  }

  private parseToken(rawToken?: string) {
    if (!rawToken) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const [bearer, token] = rawToken.split(' ');

    if (!bearer || bearer !== 'Bearer') {
      throw new UnauthorizedException('Invalid token format');
    }
    if (!token) {
      throw new UnauthorizedException('Invalid auth token');
    }

    return token;
  }
}
