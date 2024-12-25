import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SquadsDocument = HydratedDocument<Squads>;

@Schema({
  timestamps: true,
})
export class Squads {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    // ref: Branches.name
  })
  branch: Types.ObjectId;

  @Prop({ type: String })
  season: string;

  @Prop({ type: Types.ObjectId, required: true })
  sport: Types.ObjectId;
}

export const SquadsSchema = SchemaFactory.createForClass(Squads);
