import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from './schema/order.schema';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { UserSchemafactory } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemafactory },
      { name: Order.name, schema: OrderSchemaFactory },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
