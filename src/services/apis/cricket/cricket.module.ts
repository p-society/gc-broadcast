import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CricketController } from './cricket.controller';
import { CricketService } from './cricket.service';
import { CricketState, CricketStateSchema } from './schemas/cricket.schema';
import { MatchesModule } from '../matches/matches.module';
import {
  CricketEvent,
  CricketEventSchema,
} from './schemas/cricket.event.schema';
import { ScoreUpdateGateway } from 'src/services/gateways/scoreUpdate/scoreUpdate';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CricketState.name, schema: CricketStateSchema },
    ]),
    MongooseModule.forFeature([
      { name: CricketEvent.name, schema: CricketEventSchema },
    ]),
    MatchesModule,
    UsersModule,
  ],
  controllers: [CricketController],
  providers: [CricketService],
  exports: [CricketService],
})
export class CricketModule {}
