import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Squads } from '../../squad/schemas/squad.schema';
import { Users } from '../../users/schemas/users.schema';

export type TeamsDocument = HydratedDocument<Teams>;
@Schema({
  timestamps: true,
})
export class Teams {
  @Prop({ type: Types.ObjectId, ref: Squads.name, required: true })
  squad: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  captain: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name })
  viceCaptain: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    // ref: Sports.name
  })
  sport: Types.ObjectId;
}

export const TeamsSchema = SchemaFactory.createForClass(Teams);
