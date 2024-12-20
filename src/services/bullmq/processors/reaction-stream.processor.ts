import { Processor, WorkerHost } from '@nestjs/bullmq';
import { REACTION_STREAM_QUEUE } from '../constants/queues';
import { Job } from 'bullmq';
import { PresenceGateway } from 'src/services/gateways/presence/presence.gateway';
import { ReactionStreamJob } from '../jobs/reactions.job';
import { ReactionSocketEvents } from 'src/services/gateways/constants/reaction.events';
import { ReactionGateway } from 'src/services/gateways/reactions/reactions.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor(REACTION_STREAM_QUEUE)
export class ReactionStreamProcessor extends WorkerHost {
  constructor(private readonly internalEventEmitter: EventEmitter2) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    const {
      data: { emoji, sport },
    } = job as {
      data: ReactionStreamJob;
    };

    this.internalEventEmitter.emit(ReactionSocketEvents.IN_REACTION_BROADCAST, {
      payload: {
        emoji,
        sport,
      },
    });

    return {
      streamed: true,
      ts: new Date(),
    };
  }
}
