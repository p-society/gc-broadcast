import { Module } from '@nestjs/common';
import { ReactionGateway } from '../../gateways/reactions/reactions.gateway';
import { ReactionService } from './reactions.service';

@Module({
  providers: [ReactionGateway, ReactionService],
})
export class ReactionsModule {}
