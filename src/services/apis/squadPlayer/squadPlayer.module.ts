import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadPlayerController } from './squadPlayer.controller';
import { SquadPlayerService } from './squadPlayer.service';
import { SquadPlayers, SquadPlayersSchema } from './schemas/squadPlayer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SquadPlayers.name, schema: SquadPlayersSchema },
    ]),
  ],
  controllers: [SquadPlayerController],
  providers: [SquadPlayerService],
  exports: [SquadPlayerService],
})
export class SquadPlayerModule {}
