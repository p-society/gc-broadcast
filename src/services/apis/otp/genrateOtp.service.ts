import { Injectable } from '@nestjs/common';
import { OtpProducer } from 'src/services/bullmq/producers/otp.producer';
import { OtpDto, VerifyOtpDto } from './dto/genrateOtp.dto';
import { processEmail } from './genrateOtp.helper';
import { OtpQueueProcessor } from 'src/services/bullmq/processors/otp.processor';

@Injectable()
export class GenrateOtpService {
  constructor(
    private readonly otpProducer: OtpProducer,
    private readonly processor: OtpQueueProcessor,
  ) {}

  async enqueueOtpJob(createOtpDto: OtpDto) {
    const email = processEmail(createOtpDto);
    await this.otpProducer.pushForAsyncStream(`process-otp`, email, {
      removeOnComplete: true,
    });
  }

  async compareOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    return await this.processor.comapreOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );
  }
}
