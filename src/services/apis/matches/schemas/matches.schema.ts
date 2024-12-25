import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  MatchIncompletionReason,
  MatchOutcome,
  MatchStage,
  MatchStatus,
} from '../constants/MatchEnums';
import { Teams } from '../../team/schemas/team.schema';

export type MatchesDocument = HydratedDocument<Matches>;

@Schema({
  timestamps: true,
})
export class Matches {
  @Prop({ type: Date, required: true })
  scheduledFor: Date;

  @Prop({ type: Date })
  concludedAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Teams.name,
    required: true,
  })
  team1: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Teams.name,
    required: true,
  })
  team2: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    // ref: Sports.name // Include when sports entity is defined
    required: true,
  })
  sport: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(MatchStage),
    required: true,
  })
  stage: MatchStage;

  @Prop({
    type: String,
    enum: Object.values(MatchStatus),
    default: MatchStatus.Upcoming,
  })
  status: MatchStatus;

  @Prop({
    type: String,
    enum: Object.values(MatchOutcome),
  })
  outcome: MatchOutcome;

  @Prop({
    type: String,
    enum: Object.values(MatchIncompletionReason),
  })
  reasonForIncompletion: MatchIncompletionReason;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);
