import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { CricketState, CricketStateDocument } from './schemas/cricket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CricketEvent } from './schemas/cricket.event.schema';
import { create } from 'lodash';

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

  //Cricket class exclusive methods
  async createEvent(matchid: string, createCricketEventDTO: CricketEvent) {
    const event = await this.cricketEventModel.create({
      match: matchid,
      ...createCricketEventDTO,
    });
    return event;
  }

  async getLatestMatchState(matchid) {
    console.log(matchid);
    const objectid = new Types.ObjectId(matchid);
    const matchStates = await this.cricketStateModel
      .find({ match: objectid })
      .sort({ createdAt: -1 });

    matchStates.forEach((state) => {
      console.log(state.matchoutcome[0]);
    });

    return matchStates[0];
  }
}
