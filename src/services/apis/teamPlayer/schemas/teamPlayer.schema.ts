import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TeamPlayerDocument = HydratedDocument<TeamPlayer>;

@Schema({
  timestamps: true,
})
export class TeamPlayer {
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  team: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['playing', 'retired', 'banned', 'substituted'],
    default: 'playing',
  })
  status: string;
}

export const TeamPlayerSchema = SchemaFactory.createForClass(TeamPlayer);
