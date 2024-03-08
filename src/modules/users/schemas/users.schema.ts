import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserAddress } from '../entities/user.entity';
import { OrderSchema } from 'src/modules/orders/schema/order.schema';
import { ProductSchema } from 'src/modules/products/schema/product.schema';

export type UserDocument = User & Document;

@Schema({ collection: User.name, timestamps: true })
export class UserSchema implements User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }] })
  orders?: OrderSchema[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }] })
  products?: ProductSchema[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' }],
  })
  address?: UserAddress;
}

export const UserSchemafactory = SchemaFactory.createForClass(UserSchema);
