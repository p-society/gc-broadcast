import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Team {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'Squad', required: true })
  squad: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Match', required: true })
  match: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  captain: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  viceCaptain: Types.ObjectId;

  @Prop({ type: String, required: true })
  sport: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
