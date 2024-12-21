import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamPlayerController } from './teamPlayer.controller';
import { TeamPlayerService } from './teamPlayer.service';
import { TeamPlayer, TeamPlayerSchema } from './schemas/teamPlayer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamPlayer.name, schema: TeamPlayerSchema },
    ]),
  ],
  controllers: [TeamPlayerController],
  providers: [TeamPlayerService],
  exports: [TeamPlayerService],
})
export class TeamPlayerModule {}
