import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamPlayerController } from './teamPlayer.controller';
import { TeamPlayerService } from './teamPlayer.service';
import { TeamPlayers, TeamPlayersSchema } from './schemas/teamPlayer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamPlayers.name, schema: TeamPlayersSchema },
    ]),
  ],
  controllers: [TeamPlayerController],
  providers: [TeamPlayerService],
  exports: [TeamPlayerService],
})
export class TeamPlayerModule {}
