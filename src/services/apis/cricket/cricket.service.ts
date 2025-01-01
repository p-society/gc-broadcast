import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { CricketState, CricketStateDocument } from './schemas/cricket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CricketService extends GlobalService<
  CricketState,
  CricketStateDocument
> {
  constructor(
    @InjectModel(CricketState.name)
    private readonly cricketStateModel: Model<CricketStateDocument>,
  ) {
    super(cricketStateModel);
  }
}
