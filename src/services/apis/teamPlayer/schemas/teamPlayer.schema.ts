import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';
import { Team } from '../../team/schemas/team.schema';

export type TeamPlayerDocument = HydratedDocument<TeamPlayer>;

@Schema({
  timestamps: true,
})
export class TeamPlayer {
  @Prop({
    type: Types.ObjectId,
    ref: Team.name,
    required: true,
  })
  teamId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  playerId: Types.ObjectId;

  @Prop({ trim: true })
  role?: string; // e.g., "batsman", "bowler", "goalkeeper"

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
  })
  deletedBy: Types.ObjectId;

  @Prop({
    type: Date,
  })
  deletedAt: Date;
}

export const TeamPlayerSchema = SchemaFactory.createForClass(TeamPlayer);
