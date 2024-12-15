import { Module } from '@nestjs/common';
import { SendOtpController } from './sendOtp.controller';
import Mailer from 'src/common/mailer';

@Module({
  imports: [],
  controllers: [SendOtpController],
  providers: [Mailer],
  exports: [],
})
export class SendOtpModule {}
