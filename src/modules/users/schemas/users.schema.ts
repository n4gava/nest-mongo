import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserAddress } from '../entities/user.entity';
import { OrderSchema } from 'src/modules/orders/schema/order.schema';

export type UserDocument = HydratedDocument<typeof UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }] })
  orders?: Array<OrderSchema>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address?: UserAddress;
}

export const UserSchemafactory = SchemaFactory.createForClass(UserSchema);
