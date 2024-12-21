import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { REACTION_STREAM_QUEUE } from './constants/queues';
import { ReactionStreamProducer } from './producers/reaction-stream.producer';
import { ReactionStreamProcessor } from './processors/reaction-stream.processor';
import { PresenceModule } from '../gateways/presence/presence.module';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({ name: REACTION_STREAM_QUEUE }),
    PresenceModule,
  ],
  providers: [ReactionStreamProcessor, ReactionStreamProducer],
  exports: [ReactionStreamProcessor, ReactionStreamProducer],
})
export class QueueModule {}
