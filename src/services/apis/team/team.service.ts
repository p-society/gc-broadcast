import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Teams, TeamsDocument } from './schemas/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamService extends GlobalService<Teams, TeamsDocument> {
  constructor(
    @InjectModel(Teams.name)
    private readonly teamModel: Model<TeamsDocument>,
  ) {
    super(teamModel);
  }
}
