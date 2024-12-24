import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MatchesDocument = HydratedDocument<Matches>;

@Schema({
  timestamps: true,
})
export class Matches {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: Date, required: true })
  scheduledFor: Date;

  @Prop({ type: Date })
  concludedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  team1: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  team2: Types.ObjectId;

  @Prop({ type: String, required: true })
  sport: string;

  @Prop({
    type: String,
    enum: ['league', 'qualifier', 'final'],
    required: true,
  })
  stage: string;

  @Prop({
    type: String,
    enum: ['live', 'upcoming', 'concluded', 'paused', 'postponed', 'cancelled'],
    default: 'upcoming',
  })
  status: string;

  @Prop({
    type: String,
    enum: ['team1', 'team2', 'draw', 'no_result'],
    default: 'no_result',
  })
  outcome: string;

  @Prop({
    type: String,
    enum: ['bad_weather', 'insufficient_time', 'other'],
    default: null,
  })
  reasonForIncompletion: string;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
