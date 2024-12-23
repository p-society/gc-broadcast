import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { REACTION_STREAM_QUEUE, OTP_QUEUE } from './constants/queues';
import { ReactionStreamProducer } from './producers/reaction-stream.producer';
import { ReactionStreamProcessor } from './processors/reaction-stream.processor';
import { OtpProducer } from './producers/otp.producer';
import { PresenceModule } from '../gateways/presence/presence.module';
import { OtpQueueProcessor } from './processors/otp.processor';
import { MailerModule } from '../apis/mailer/mailer.module';

@Global()
@Module({
  imports: [
    BullModule.registerQueue(
      { name: REACTION_STREAM_QUEUE },
      { name: OTP_QUEUE },
    ),
    PresenceModule,
    MailerModule,
  ],
  providers: [
    ReactionStreamProcessor,
    ReactionStreamProducer,
    OtpProducer,
    OtpQueueProcessor,
  ],
  exports: [
    ReactionStreamProcessor,
    ReactionStreamProducer,
    OtpProducer,
    OtpQueueProcessor,
  ],
})
export class QueueModule {}
