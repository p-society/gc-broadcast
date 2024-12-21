import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { TeamPlayer, TeamPlayerDocument } from './schemas/teamPlayer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamPlayerService extends GlobalService<
  TeamPlayer,
  TeamPlayerDocument
> {
  constructor(
    @InjectModel(TeamPlayer.name)
    private readonly teamPlayerModel: Model<TeamPlayerDocument>,
  ) {
    super(teamPlayerModel);
  }
}
