// product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from 'src/modules/orders/entities/order.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Array<User | Types.ObjectId>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orders: Array<Order | Types.ObjectId>;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(Product);
