import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from '../../users/schemas/users.schema';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({
  timestamps: true,
})
export class Otp {
  @Prop({
    type: String,
    enum: ['mobile', 'email'],
    default: 'email',
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  dest: string;

  @Prop({
    type: String,
    required: true,
  })
  otp: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
