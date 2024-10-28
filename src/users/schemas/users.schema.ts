import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import RolesEnum, { RolesEnumList } from '../../constants/roles-enum';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ type: Date })
  dob: Date;

  @Prop({ enum: ['male', 'female', 'others'], trim: true })
  gender: string;

  @Prop({ enum: RolesEnumList, default: RolesEnum.USER })
  type: number;

  @Prop({ default: false })
  isUmpire: boolean;

  @Prop({ type: Object })
  data: Record<string, any>; // for form-fields

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Users.name,
  })
  createdBy: Types.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(Users);