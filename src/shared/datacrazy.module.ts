import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SessionContext } from './cls/session.cls';

@Module({
    imports: [CqrsModule],
    providers: [SessionContext],
    exports: [SessionContext, CqrsModule],
})
export class DataCrazyModule {


}
