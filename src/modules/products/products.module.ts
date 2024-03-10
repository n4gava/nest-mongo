import { Module, Scope } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { ProductSchemaFactory } from './schema/product.schema';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { UserSchemafactory } from '../users/schemas/users.schema';
import { OrderSchemaFactory } from '../orders/schema/order.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchemaFactory },
            { name: User.name, schema: UserSchemafactory },
            { name: Order.name, schema: OrderSchemaFactory },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
