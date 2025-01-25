import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Matches } from '../../matches/schemas/matches.schema';
import { HydratedDocument, Types } from 'mongoose';
import EnsureObjectId from 'src/common/EnsureObjectId';
import { SoftDeleteSchema } from 'src/common/soft-delete-schema';

export type CricketFomatDocument = HydratedDocument<CricketFormat>;

@Schema({
  timestamps: true,
})
export class CricketFormat extends SoftDeleteSchema {
  @Prop({
    required: true,
    index: true,
    trim: true,
  })
  sport: string;

  @Prop()
  totalOvers: number;

  @Prop()
  powerplayOvers: number;

  @Prop()
  legalDeliveriesPerOver: number;

  @Prop({
    type: Object,
  })
  penaltyActions: PenaltyActions;

  @Prop({
    type: Object,
  })
  extraActions: ExtraActions;
}

export const CricketFormatSchema = SchemaFactory.createForClass(CricketFormat);
