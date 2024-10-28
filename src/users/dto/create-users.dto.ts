import { SchemaType, Types } from 'mongoose';

export class CreateUsersDto {
  readonly _id?: Types.ObjectId;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdBy: string | Types.ObjectId;
}
