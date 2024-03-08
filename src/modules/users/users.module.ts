import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemafactory } from './schemas/users.schema';
import { OrderSchemaFactory } from '../orders/schema/order.schema';
import { User, UserAddress } from './entities/user.entity';
import { UserAddressSchemaFactory } from './schemas/usersAddress.schema';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchemafactory },
      { name: UserAddress.name, schema: UserAddressSchemaFactory },
      { name: Order.name, schema: OrderSchemaFactory },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
