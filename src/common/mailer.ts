import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

/**
 *  Maybe we can add DKIM support to prevent mails going to spam?
 *  @ref {https://github.com/feathersjs-ecosystem/feathers-mailer/pull/35}
 */

@Injectable()
export default class Mailer {
  // private _transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  // constructor(private readonly configService: ConfigService) {
  //   // Fetching and parsing environment variables
  //   const host = this.configService.get<string>('MAIL_HOST');
  //   const port = parseInt(this.configService.get<string>('MAIL_PORT'), 10); // Ensure port is a number
  //   const secure = this.configService.get<string>('MAIL_SECURE') === 'true'; // Ensure boolean
  //   const user = this.configService.get<string>('MAIL_USER');
  //   const pass = this.configService.get<string>('MAIL_PASSWORD');
  //   // Create the nodemailer transporter
  //   this._transporter = nodemailer.createTransport({
  //     host,
  //     port,
  //     secure, // Boolean value
  //     auth: {
  //       user,
  //       pass,
  //     },
  //     tls: {
  //       rejectUnauthorized: false, // Disable certificate validation for non-verified SSL certs
  //     },
  //     // dkim: {
  //     //   domainName: this.configService.get<string>('MAIL_DKIM_DOMAIN'), // DKIM domain
  //     //   keySelector: this.configService.get<string>('MAIL_DKIM_SELECTOR'), // DKIM selector
  //     //   privateKey: this.configService.get<string>('MAIL_DKIM_PRIVATE_KEY'), // DKIM private key
  //     // },
  //   });
  // }
  // /**
  //  * Sends password reset OTP to a list of recipients.
  //  * @param recipients List of email addresses to send OTP to
  //  * @param subject Email subject
  //  * @param templ HTML template for the email
  //  * @param plaintext Optional plain text version of the email
  //  */
  // public async sendPasswordResetOTP(
  //   recipients: string[],
  //   subject: string,
  //   templ: string,
  //   plaintext?: string,
  // ): Promise<void> {
  //   try {
  //     const promises = recipients.map(async (recipient) => {
  //       const info = await this._transporter.sendMail({
  //         from: this.configService.get<string>('MAIL_FROM'),
  //         to: recipient,
  //         subject,
  //         html: templ,
  //         text: plaintext || '',
  //       });
  //       console.log(`Message sent to ${recipient}: ${info.messageId}`);
  //       return info;
  //     });
  //     await Promise.all(promises);
  //     console.log('All messages sent successfully!');
  //   } catch (error: any) {
  //     console.error('Error sending emails:', error);
  //     throw new Error(`Failed to send password reset OTP: ${error.message}`);
  //   }
  // }
  // /**
  //  * Sends OTP to a single recipient.
  //  * @param recipient The email address to send OTP to
  //  * @param subject Email subject
  //  * @param templ HTML template for the email
  //  * @param plaintext Optional plain text version of the email
  //  */
  // public async sendOTP(
  //   recipient: string,
  //   subject: string,
  //   templ: string,
  //   plaintext?: string,
  // ): Promise<void> {
  //   try {
  //     const info = await this._transporter.sendMail({
  //       from: this.configService.get<string>('MAIL_FROM'),
  //       to: recipient,
  //       subject,
  //       html: templ,
  //       text: plaintext || '',
  //     });
  //     console.log(`Message sent to ${recipient}: ${info.messageId}`);
  //   } catch (error: any) {
  //     console.error('Error sending OTP:', error);
  //     throw new Error(`Failed to send OTP: ${error.message}`);
  //   }
  // }
}
