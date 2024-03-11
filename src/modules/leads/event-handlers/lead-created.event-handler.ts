import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LeadCreatedEvent } from '../events/lead-created.event';
import { LeadsRepository } from '../repositories/leads.repository';
import { CreateLeadCommand } from '../commands/create-lead.command';
import CreateLeadDto from '../dtos/create-lead.dto';
import { SessionContext } from 'src/shared/cls/session.cls';
import { NotFoundException } from '@nestjs/common';


@EventsHandler(LeadCreatedEvent)
export class LeadCreatedEventHandler
    implements IEventHandler<LeadCreatedEvent>
{
    constructor(private commandBus: CommandBus, private sessionContext: SessionContext) {

    }

    async handle(event: LeadCreatedEvent) {
        
        console.log("handler", this.sessionContext.get() );
        await new Promise(r => setTimeout(r, 5000));
        console.log("handler 2", this.sessionContext.get() );
        throw new NotFoundException("error");
    }
}
