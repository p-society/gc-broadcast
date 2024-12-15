import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailerService: NestMailerService) {}

  private template = 'base';

  async sendMail(
    to: string,
    subject: string,
    content: string,
    template?: string,
    context?: Record<string, any>,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: content,
      template: template ? `./${template}` : undefined,
      context: context || {},
    });
  }
}
