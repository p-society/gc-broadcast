import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Team, TeamDocument } from './schemas/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamService extends GlobalService<Team, TeamDocument> {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {
    super(teamModel);
  }
}
