import { Module } from '@nestjs/common';
import { GenerateOtpController } from './generateOtp.controller';
import { QueueModule } from 'src/services/bullmq/queue.module';
import { GenrateOtpService } from './genrateOtp.service';

@Module({
  imports: [QueueModule],
  controllers: [GenerateOtpController],
  providers: [GenrateOtpService],
  exports: [GenrateOtpService], // not exporting services as no need in testing
})
export class GenerateOtpModule {}
