import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballStateController } from './state.controller';
import { MatchStateService } from './state.service';
import { MatchState, MatchStateSchema } from './state.schema';
import { AdminGuard } from '../admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchState.name, schema: MatchStateSchema },
    ]),
  ],
  controllers: [FootballStateController],
  providers: [MatchStateService, AdminGuard],
  exports: [MatchStateService],
})
export class StateModule {}
