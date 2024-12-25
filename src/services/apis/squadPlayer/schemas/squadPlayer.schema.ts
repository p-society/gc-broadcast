import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SquadPlayerStatus } from '../constants/SquadPlayerEnum';
import { Squads } from '../../squad/schemas/squad.schema';
import { Users } from '../../users/schemas/users.schema';

export type SquadPlayersDocument = HydratedDocument<SquadPlayers>;

@Schema({
  timestamps: true,
})
export class SquadPlayers {
  @Prop({ type: Types.ObjectId, ref: Squads.name, required: true })
  squad: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(SquadPlayerStatus),
    default: SquadPlayerStatus.Pending,
  })
  status: SquadPlayerStatus;
}
export const SquadPlayersSchema = SchemaFactory.createForClass(SquadPlayers);
