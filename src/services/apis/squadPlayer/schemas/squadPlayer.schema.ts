import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type SquadPlayerDocument = HydratedDocument<SquadPlayer>;

@Schema({
  timestamps: true,
})
export class SquadPlayer {
  @Prop({ type: Types.ObjectId, ref: 'Squad', required: true })
  squad: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending',
  })
  status: string;
}
export const SquadPlayerSchema = SchemaFactory.createForClass(SquadPlayer);
