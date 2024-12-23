import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpProducer } from 'src/services/bullmq/producers/otp.producer';
import { OtpDto, VerifyOtpDto } from './dto/generateOtp.dto';
// import { processEmail } from './helpers/generateOtp.helper';
import { OtpQueueProcessor } from 'src/services/bullmq/processors/otp.processor';
import { compareHashedString } from 'src/common/hashing';
import { RedisService } from 'src/services/redis/redis.service';
import { generateKey } from 'src/services/bullmq/constants/generate-keys';

@Injectable()
export class GenerateOtpService {
  constructor(
    private readonly otpProducer: OtpProducer,
    private readonly redisService: RedisService,
  ) {}

  async enqueueOtpJob(createOtpDto: OtpDto) {
    const email = createOtpDto['email'].trim();
    const resp = await this.otpProducer.pushForAsyncMailing(
      `process-otp`,
      { email },
      {
        removeOnComplete: true,
      },
    );
    return resp;
  }

  async compareOtp(
    verifyOtpDto: VerifyOtpDto,
    removeEntryAfterCheck = false,
  ): Promise<boolean | BadRequestException> {
    const key = generateKey(verifyOtpDto.email);
    const val = await this.redisService.get(key);

    if (!val) {
      throw new BadRequestException(
        'The OTP has expired or no request for an OTP was found. Please try requesting a new OTP.',
      );
    }

    const resp = await compareHashedString(verifyOtpDto.otp, val);
    if (removeEntryAfterCheck) await this.redisService.del(key);
    return resp;
  }
}
