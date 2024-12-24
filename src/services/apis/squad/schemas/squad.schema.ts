import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SquadDocument = HydratedDocument<Squad>;

@Schema({
  timestamps: true,
})
export class Squad {
  @Prop({ required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  branch: string;

  @Prop({ type: String })
  season: string;

  @Prop({ type: String, required: true })
  sport: string;
}

export const SquadSchema = SchemaFactory.createForClass(Squad);
