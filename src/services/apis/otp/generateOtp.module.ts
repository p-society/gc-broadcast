import { Module } from '@nestjs/common';
import { GenerateOtpController } from './generateOtp.controller';
import { GenerateOtpService } from './generateOtp.service';

@Module({
  imports: [],
  controllers: [GenerateOtpController],
  providers: [GenerateOtpService],
  exports: [GenerateOtpService], // not exporting services as no need in testing (??)
})
export class GenerateOtpModule {}
