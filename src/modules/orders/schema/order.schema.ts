// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Order } from '../entities/order.entity';

export type OrderDocument = Order & Document;

@Schema({ collection: Order.name, timestamps: true })
export class OrderSchema implements Order {
  @Prop({ required: true })
  quantity: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }] })
  orders?: OrderSchema[];
}

export const OrderSchemaFactory = SchemaFactory.createForClass(OrderSchema);
