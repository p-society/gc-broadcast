import { Injectable } from '@nestjs/common';
import { ReactionDto } from './dto/reactions.dto';
import { processReaction } from './reaction.helper';
import { ReactionStreamProducer } from 'src/services/bullmq/producers/reaction-stream.producer';

@Injectable()
export class ReactionService {
  constructor(
    private readonly reactionStreamProducer: ReactionStreamProducer,
  ) {}
  async enqueueReactions(createReactionsDto: ReactionDto) {
    const reaction = processReaction(createReactionsDto);
    await this.reactionStreamProducer.pushForAsyncStream(
      `process-reaction`,
      reaction,
      {
        removeOnComplete: true,
      },
    );
  }
}
