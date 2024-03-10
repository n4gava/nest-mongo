import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LeadsModule } from './modules/leads/leads.module';
import { LeadsController } from './modules/leads/leads.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AsyncLocalStorage } from 'async_hooks';
import { ClsModule } from 'nestjs-cls';
import { FirebaseApp } from './shared/auth/firebase.app';
import { AuthMiddleware } from './shared/auth/auth.middleware';
import { DataCrazyModule } from './shared/datacrazy.module';
import { DataCrazyAppModule } from './shared/datacrazy-app.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DataCrazyAppModule,
    MongooseModule.forRoot(process.env.DB_URL),
    OrdersModule,
    ProductsModule,
    LeadsModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('tenantId', req["tenantId"]);
        },
      },
    })
  ],
  controllers: [AppController, LeadsController],
  providers: [AppService],
})
export class AppModule {

}
