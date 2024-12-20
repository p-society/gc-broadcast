import { Module } from '@nestjs/common';
import { ReactionGateway } from '../../gateways/reactions/reactions.gateway';
import { ReactionService } from './reactions.service';
import { PresenceModule } from 'src/services/gateways/presence/presence.module';
import { ReactionController } from './reactions.controller';

@Module({
  imports: [PresenceModule],
  providers: [ReactionGateway, ReactionService],
  exports: [ReactionService],
  controllers: [ReactionController],
})
export class ReactionsModule {}
