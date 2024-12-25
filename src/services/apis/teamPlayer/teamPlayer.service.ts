import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { TeamPlayers, TeamPlayersDocument } from './schemas/teamPlayer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamPlayerService extends GlobalService<
  TeamPlayers,
  TeamPlayersDocument
> {
  constructor(
    @InjectModel(TeamPlayers.name)
    private readonly teamPlayerModel: Model<TeamPlayersDocument>,
  ) {
    super(teamPlayerModel);
  }
}
