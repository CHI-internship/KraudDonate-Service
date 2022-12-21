import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /**
   *
   * @param {string} email - Recipient's email
   * @param {string} subject - Email subject
   * @param {string} html - Template function than return the body of the email
   */
  async sendEmail(email: string, subject: string, html: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'krauddonate@gmail.com',
      subject: subject,
      html: html,
    });
  }
}
