import { Module, Scope } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LeadsController } from './leads.controller';
import { GetLeadsHandler } from './queries/handlers/get-leads.handler';
import { LeadsRepository } from './repositories/leads.repository';
import { MongoLeadsRepository } from './repositories/impl/mongo.leads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead } from './domain/lead.domain';
import { LeadSchemaFactory } from './schema/lead.schema';
import { DataCrazyModule } from 'src/shared/datacrazy.module';
import { CreateLeadCommandHandler } from './commands/create-lead.command';
import { LeadCreatedEventHandler } from './event-handlers/lead-created.event-handler';

@Module({
    imports: [
        DataCrazyModule,
        MongooseModule.forFeature([
            { name: Lead.name, schema: LeadSchemaFactory },
        ]),
    ],
    controllers: [LeadsController],
    providers: [
        {
            provide: LeadsRepository,
            useClass: MongoLeadsRepository,
        },
        GetLeadsHandler,
        CreateLeadCommandHandler,
        LeadCreatedEventHandler,
    ],
})
export class LeadsModule {}
