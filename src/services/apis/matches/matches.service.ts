import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Matches, MatchesDocument } from './schemas/matches.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MatchesService extends GlobalService<Matches, MatchesDocument> {
  constructor(
    @InjectModel(Matches.name)
    private readonly matchesModel: Model<MatchesDocument>,
  ) {
    super(matchesModel);
  }
}
