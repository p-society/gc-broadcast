import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Football, FootballDocument } from './schemas/football.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FootballService extends GlobalService<Football, FootballDocument> {
  constructor(
    @InjectModel(Football.name)
    private readonly footballModel: Model<FootballDocument>,
  ) {
    super(footballModel);
  }
}
