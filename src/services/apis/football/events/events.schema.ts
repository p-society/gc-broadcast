import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Common interfaces
interface Player {
  name: string;
  number: number;
}

interface Assist extends Player {}

// Event-specific detail interfaces
interface GoalDetails {
  team: string;
  scorer: Player & { assist?: Assist };
  minute: number;
  description: string;
}

interface SubstitutionDetails {
  team: string;
  outPlayer: Player;
  inPlayer: Player;
  minute: number;
}

interface FoulDetails {
  team: string;
  player: Player;
  type: string;
  card: 'yellow' | 'red' | 'none';
  minute: number;
}

interface InjuryDetails {
  team: string;
  player: Player;
  severity: 'minor' | 'moderate' | 'severe';
  minute: number;
}

interface PenaltyDetails {
  team: string;
  player: Player;
  success: boolean;
  minute: number;
}

interface VarDetails {
  incident: string;
  team: string;
  player: Player;
  decision: string;
  minute: number;
}

type EventDetails =
  | GoalDetails
  | SubstitutionDetails
  | FoulDetails
  | InjuryDetails
  | PenaltyDetails
  | VarDetails;

@Schema({ timestamps: true })
export class MatchEvent extends Document {
  @Prop({
    required: true,
    enum: ['goal', 'substitution', 'foul', 'injury', 'penalty', 'var_decision'],
  })
  type: string;

  @Prop({ type: Object, required: true })
  details: EventDetails;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  matchId: string;
}

export const MatchEventSchema = SchemaFactory.createForClass(MatchEvent);
