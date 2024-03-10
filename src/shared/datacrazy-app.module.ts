import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsModule, ClsService, ClsStore } from 'nestjs-cls';
import { FirebaseApp } from './auth/firebase.app';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthMiddleware } from './auth/auth.middleware';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGuard } from './guards/authorize.guards';
import {
    SessionContext,
    setSessionClsByRequest,
} from './cls/session.cls';

@Module({
    imports: [
        CqrsModule,
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                setup: setSessionClsByRequest,
            },
        }),
    ],
    providers: [
        FirebaseApp,
        {
            provide: APP_GUARD,
            useClass: AuthorizeGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        SessionContext,
    ],
    exports: [FirebaseApp, CqrsModule, SessionContext],
})
export class DataCrazyAppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }
}
