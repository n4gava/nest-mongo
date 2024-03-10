import { Module, Scope } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LeadsController } from './leads.controller';
import { GetLeadsHandler } from './queries/henalders/get-leads.handler';
import { LeadsRepository } from './repositories/leads.repository';
import { MongoLeadsRepository } from './repositories/impl/mongo.leads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead } from './domain/lead.domain';
import { LeadSchemaFactory } from './schema/lead.schema';
import { CreateLeadCommandHandler } from './commands/handlers/create-lead.command.handler';
import { DataCrazyModule } from 'src/shared/datacrazy.module';

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
        CreateLeadCommandHandler
    ],
})
export class LeadsModule {}
