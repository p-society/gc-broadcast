import { Injectable } from '@nestjs/common';
import { OtpProducer } from 'src/services/bullmq/producers/otp.producer';
import { OtpDto } from './dto/genrateOtp.dto';
import { processEmail } from './genrateOtp.helper';

@Injectable()
export class GenrateOtpService {
  constructor(private readonly otpProducer: OtpProducer) {}

  async enqueueOtpJob(createOtpDto: OtpDto) {
    const email = processEmail(createOtpDto);
    await this.otpProducer.pushForAsyncStream(`process-otp`, email, {
      removeOnComplete: true,
    });
  }
}
