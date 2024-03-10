import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lead } from '../domain/lead.domain';

export type LeadDocument = LeadSchema & Document;

@Schema({ collection: 'leads' })
export class LeadSchema  {
  @Prop({ required: true })
  tenantId: string;
  
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
}

export const LeadSchemaFactory = SchemaFactory.createForClass(LeadSchema);
