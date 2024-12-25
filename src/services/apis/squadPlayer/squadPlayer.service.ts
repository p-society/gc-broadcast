import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import {
  SquadPlayers,
  SquadPlayersDocument,
} from './schemas/squadPlayer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SquadPlayerService extends GlobalService<
  SquadPlayers,
  SquadPlayersDocument
> {
  constructor(
    @InjectModel(SquadPlayers.name)
    private readonly squadPlayerModel: Model<SquadPlayersDocument>,
  ) {
    super(squadPlayerModel);
  }
}
