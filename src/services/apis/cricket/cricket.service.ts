import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { CricketState, CricketStateDocument } from './schemas/cricket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CricketEvent } from './schemas/cricket.event.schema';

@Injectable()
export class CricketService extends GlobalService<
  CricketState,
  CricketStateDocument
> {
  constructor(
    @InjectModel(CricketState.name)
    private readonly cricketStateModel: Model<CricketStateDocument>,
    @InjectModel(CricketEvent.name)
    private readonly cricketEventModel: Model<CricketEvent>,
  ) {
    super(cricketStateModel);
  }

  async createEvent(createCricketEventDTO: CricketEvent) {
    const event = await this.cricketEventModel.create(createCricketEventDTO);
    return event;
  }
}
