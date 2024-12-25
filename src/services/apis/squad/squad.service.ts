import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Squads, SquadsDocument } from './schemas/squad.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SquadService extends GlobalService<Squads, SquadsDocument> {
  constructor(
    @InjectModel(Squads.name)
    private readonly squadModel: Model<SquadsDocument>,
  ) {
    super(squadModel);
  }

  // Assign a captain to a squad
  async assignCaptain(squadId: string, captainId: string): Promise<Squads> {
    return this.squadModel.findByIdAndUpdate(
      squadId,
      { captainId },
      { new: true },
    );
  }
}
