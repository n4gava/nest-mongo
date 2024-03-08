import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../entities/user.entity';
import { Document } from 'mongoose';

export type UserAddressDocument = UserAddress & Document;

@Schema({ timestamps: true })
export class UserAddress {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  zipCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | mongoose.Schema.Types.ObjectId;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
