import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { CreateSendOtpValidation } from './dto/sendOtp.dto';
import Mailer from 'src/common/mailer';

@Controller('send-otp')
export class SendOtpController {
  constructor(private readonly mailerService: Mailer) {}

  @Post()
  async sendOtpToEmail(@Body('email') email: string) {
    ({ email } = CreateSendOtpValidation.parse({ email }));
    
    // await this.mailerService.sendOTP(email,'X','Y','Z');
    return {
      message: 'mail sent successfully!'
    }
  }
}
