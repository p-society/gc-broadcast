import { Processor, WorkerHost } from '@nestjs/bullmq';
import { REACTION_STREAM_QUEUE } from '../constants/queues';
import { Job } from 'bullmq';
import { PresenceGateway } from 'src/services/gateways/presence/presence.gateway';
import { ReactionStreamJob } from '../jobs/reactions.job';
import { ReactionSocketEvents } from 'src/services/gateways/constants/reaction.events';

@Processor(REACTION_STREAM_QUEUE)
export class ReactionStreamProcessor extends WorkerHost {
  constructor(private readonly presenceGateway: PresenceGateway) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    const {
      data: { emoji, sport },
    } = job as {
      data: ReactionStreamJob;
    };

    const done = this.presenceGateway.server.emit(
      ReactionSocketEvents.REACTION_BROADCAST,
      {
        payload: {
          emoji,
          sport,
        },
      },
    );

    return {
      done,
    };
  }
}
