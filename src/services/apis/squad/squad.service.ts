import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Squad, SquadDocument } from './schemas/squad.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SquadService extends GlobalService<Squad, SquadDocument> {
  constructor(
    @InjectModel(Squad.name)
    private readonly squadModel: Model<SquadDocument>,
  ) {
    super(squadModel);
  }

  // Assign a captain to a squad
  async assignCaptain(squadId: string, captainId: string): Promise<Squad> {
    return this.squadModel.findByIdAndUpdate(
      squadId,
      { captainId },
      { new: true },
    );
  }
}
