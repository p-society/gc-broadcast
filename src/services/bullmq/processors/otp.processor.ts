import { Processor, WorkerHost } from '@nestjs/bullmq';
import { OTP_QUEUE } from '../constants/queues';
import { RedisService } from 'src/services/redis/redis.service';
import { Job } from 'bullmq';
import { OTP_TTL } from 'src/constants/otp.constants';
import { hashString } from 'src/common/hashing';
import { OtpJob } from '../jobs/otp.jobs';
import generateRandomNumber from 'src/common/generate-random-number';
import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/services/apis/mailer/mailer.service';

@Injectable()
@Processor(OTP_QUEUE)
export class OtpQueueProcessor extends WorkerHost {
  constructor(
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
  ) {
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
      await this.mailerService.sendMail(email, this.otp, 'partials/otp.hbs');
      console.log(`OTP email sent to ${email}`);
    } catch (error) {
      console.error('Error in processing OTP job', error);
    }
  }

  async storeOtpWithTTL(email: string, otp: number): Promise<void> {
    const key = await generateKey(email);
    const hashedOtp = await hashString(otp.toString());
    const value = hashedOtp;
    await this.redisService.set(key, value, OTP_TTL);
  }

  async comapreOtp(email: string, otp: string): Promise<boolean> {
    const key = await generateKey(email);
    const hashedOtp = await hashString(otp);
    const storedOtp = await this.redisService.get(key);
    return hashedOtp === storedOtp;
  }
}

async function generateKey(email: string): Promise<string> {
  return `verification::email:${email}`;
}
