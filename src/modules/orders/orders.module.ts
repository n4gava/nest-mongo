import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'orders', schema: OrderSchemaFactory }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
