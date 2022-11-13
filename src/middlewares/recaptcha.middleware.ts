import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RecaptchaService } from 'src/utils/recaptcha';

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {
    constructor(private readonly recaptcha: RecaptchaService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const recaptchaVerified = await this.recaptcha.check(req.body.recaptchaToken)
        if (recaptchaVerified && process.env.NODE_ENV !== 'development') next()
        else throw new BadRequestException('Recaptcha check failed')
    }
}
