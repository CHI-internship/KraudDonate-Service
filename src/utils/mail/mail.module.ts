import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: process.env.MAIL_SERVICE_DOMAIN,
          pass: process.env.MAIL_SERVICE_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <krauddonate@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
