import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailerService: NestMailerService) {}

  private template = 'base';

  async sendMail(
    to: string,
    // subject: string,
    // content: string,
    otp: string,
    template?: string,
    //context?: Record<string, any>,
  ) {
    await this.mailerService.sendMail({
      to,
      subject: 'OTP for your account',
      template: template ? `./${template}` : undefined,
      context: {
        otp,
        supportEmail: 'techsociety@iiit-bh.ac.in',
      },
    });
  }
}
