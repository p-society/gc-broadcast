import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { CricketState, CricketStateDocument } from './schemas/cricket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CricketEvent } from './schemas/cricket.event.schema';
import { EventType } from 'src/types/EventType';
import { create } from 'lodash';
import { updateCricketEeventDTOType } from './dto/cricket.event.dto';

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

  async getPreviousatestEvent(matchID, prevEventID) {
    const matchObjectID = new Types.ObjectId(matchID);
    if (!prevEventID)
      return await this.cricketEventModel
        .find({ match: matchObjectID })
        .sort({ createdAt: -1 });

    const prevEventObjectID = new Types.ObjectId(prevEventID);
    const TargetEvent: EventType = await this.cricketEventModel.findOne({
      _id: prevEventObjectID,
      match: matchObjectID,
    });
    const events = await this.cricketEventModel
      .find({ match: matchObjectID, createdAt: { $lt: TargetEvent.createdAt } })
      .sort({ createdAt: -1 });

    return events[0];
  }

  async getPreviousEventSeries(matchID, prevEventID) {
    const matchObjectId = new Types.ObjectId(matchID);
    if (!prevEventID)
      return await this.cricketEventModel
        .find({ match: matchObjectId })
        .sort({ createdAt: -1 });

    const prevEventObjectID = new Types.ObjectId(prevEventID);
    const TargetEvent: EventType = await this.cricketEventModel.findOne({
      _id: prevEventObjectID,
      match: matchObjectId,
    });
    const events = await this.cricketEventModel
      .find({ match: matchObjectId, createdAt: { $lt: TargetEvent.createdAt } })
      .sort({ createdAt: -1 });
    return events;
  }

  async updateEvent(
    id: string,
    updateCricketEventDTO: updateCricketEeventDTOType,
  ) {
    return await this.cricketEventModel.findByIdAndUpdate(
      id,
      updateCricketEventDTO,
    );
  }

  async deleteEvent(id: string) {
    const result = await this.cricketEventModel.findByIdAndDelete(id);
    return {
      message: 'Deleted Successfully',
    };
  }
}
