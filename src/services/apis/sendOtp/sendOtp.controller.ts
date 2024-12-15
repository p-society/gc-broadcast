import { Body, Controller, Post } from '@nestjs/common';
import { CreateSendOtpValidation } from './dto/sendOtp.dto';
// import Mailer from 'src/common/mailer';
import { Public } from '../auth/decorators/public.decorator';
import { OtpService } from '../otp/otp.service';
import generateRandomNumber from 'src/common/generate-random-number';
import { MailerService } from '../mailer/mailer.service';

@Controller('send-otp')
export class SendOtpController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly otpService: OtpService,
  ) {}

  @Public()
  @Post()
  async sendOtpToEmail(@Body('email') email: string) {
    ({ email } = CreateSendOtpValidation.parse({ email }));

    const otp = generateRandomNumber();
    // await this.mailerService.sendMail(email,'X','Y','Z');
    await this.otpService._create({
      dest: email,
      otp,
      type: 'email',
    });

    return {
      message: 'mail sent successfully!',
    };
  }
}
