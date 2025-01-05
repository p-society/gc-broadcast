import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Matches } from '../../matches/schemas/matches.schema';
import { HydratedDocument, Types } from 'mongoose';
import EnsureObjectId from 'src/common/EnsureObjectId';
import { SoftDeleteSchema } from 'src/common/soft-delete-schema';

export type CricketEventDocument = HydratedDocument<CricketEvent>;

@Schema({
  timestamps: true,
})
export class CricketEvent extends SoftDeleteSchema {
  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
    ref: Matches.name,
    set: EnsureObjectId,
  })
  match: Types.ObjectId;
  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: Object,
    required: true,
  })
  details: {
    runs?: number | null;
    playerOut?: string | null;
    outReason?: any[];
    wickets?: number | null;
    scoringType?: string | null;
    illegal?: string | null;
    penalty?: number | null;
  };
}

export const CricketEventSchema = SchemaFactory.createForClass(CricketEvent);
