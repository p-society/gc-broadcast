import { Processor, WorkerHost } from '@nestjs/bullmq';
import { OTP_QUEUE } from '../constants/queues';
import { RedisService } from 'src/services/redis/redis.service';
import { Job } from 'bullmq';
import { OTP_TTL } from 'src/constants/otp.constants';
import { hashString } from 'src/common/hashing';
import { OtpJob } from '../jobs/otp.jobs';
import generateRandomNumber from 'src/common/generate-random-number';

@Processor(OTP_QUEUE)
export class OtpQueueProcessor extends WorkerHost {
  constructor(private readonly redisService: RedisService) {
    super();
  }
  otp: string = generateRandomNumber();
  async process(job: Job): Promise<void> {
    try {
      const {
        data: { email },
      } = job as { data: OtpJob };
      await this.storeOtpWithTTL(email, parseInt(this.otp));
      console.log(`OTP for ${email} is ${this.otp} and stored in Redis`);
    } catch (error) {
      console.error('Error in processing OTP job', error);
    }
  }

  async storeOtpWithTTL(email: string, otp: number): Promise<void> {
    const key = await generateKey(email, otp);
    const value = new Date().toISOString();
    await this.redisService.set(key, value, OTP_TTL);
  }
}

async function generateKey(email: string, otp: number): Promise<string> {
  const hashedEmail = await hashString(email);
  const hashedOtp = await hashString(otp.toString());
  return `verification::email:${hashedEmail}:otp:${hashedOtp}`;
}
