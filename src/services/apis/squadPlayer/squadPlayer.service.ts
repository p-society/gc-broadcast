import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { SquadPlayer, SquadPlayerDocument } from './schemas/squadPlayer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SquadPlayerService extends GlobalService<
  SquadPlayer,
  SquadPlayerDocument
> {
  constructor(
    @InjectModel(SquadPlayer.name)
    private readonly squadPlayerModel: Model<SquadPlayerDocument>,
  ) {
    super(squadPlayerModel);
  }
}
