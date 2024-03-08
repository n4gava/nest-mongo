// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../entities/order.entity';

export type OrderDocument = Order & Document;

@Schema({ collection: 'orders', timestamps: true })
export class OrderSchema implements Order {
  @Prop()
  quantity: number;
}

export const OrderSchemaFactory = SchemaFactory.createForClass(Order);
