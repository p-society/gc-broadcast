import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballEventController } from './events.controller';
import { MatchEventService } from './events.service';
import { MatchEvent, MatchEventSchema } from './events.schema';
import { AdminGuard } from '../admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchEvent.name, schema: MatchEventSchema },
    ]),
  ],
  controllers: [FootballEventController],
  providers: [MatchEventService, AdminGuard],
  exports: [MatchEventService],
})
export class EventsModule {}
