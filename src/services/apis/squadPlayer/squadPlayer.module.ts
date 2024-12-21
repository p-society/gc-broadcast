import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadPlayerController } from './squadPlayer.controller';
import { SquadPlayerService } from './squadPlayer.service';
import { SquadPlayer, SquadPlayerSchema } from './schemas/squadPlayer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SquadPlayer.name, schema: SquadPlayerSchema },
    ]),
  ],
  controllers: [SquadPlayerController],
  providers: [SquadPlayerService],
  exports: [SquadPlayerService],
})
export class SquadPlayerModule {}
