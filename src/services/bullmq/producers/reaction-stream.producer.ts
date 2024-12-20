import { Injectable } from '@nestjs/common';
import { REACTION_STREAM_QUEUE } from '../constants/queues';
import { InjectQueue } from '@nestjs/bullmq';
import { JobsOptions, Queue } from 'bullmq';

@Injectable()
export class ReactionStreamProducer {
  constructor(
    @InjectQueue(REACTION_STREAM_QUEUE) private reactionStreamQueue: Queue,
  ) {}

  async pushForAsyncStream(
    jobName: string,
    data: Record<string, any>,
    options?: JobsOptions,
  ) {
    await this.reactionStreamQueue.add(jobName, data, options);
    console.log(`Job "${jobName}" added to the queue successfully.`);
  }
}
