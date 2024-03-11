import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import CreateLeadDto from '../dtos/create-lead.dto';
import { LeadsRepository } from '../repositories/leads.repository';
import { Lead } from '../domain/lead.domain';
import { LeadCreatedEvent } from '../events/lead-created.event';

export class CreateLeadCommand {
    constructor(public request: CreateLeadDto) {}
}

@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler
    implements ICommandHandler<CreateLeadCommand>
{
    constructor(
        private readonly repository: LeadsRepository,
        private readonly eventBus: EventBus,
        private publisher: EventPublisher
    ) {}

    async execute(command: CreateLeadCommand): Promise<Lead> {
        const { request } = command;
        let lead = new Lead(request.name, request.email, request.phone);
        lead.apply(new LeadCreatedEvent(lead.name));
        console.log('apply event');
        const createdLead = await this.repository.create(lead);

        lead = this.publisher.mergeObjectContext(lead);
          
        console.log('commit', lead.getUncommittedEvents());
        lead.commit();

        console.log('depois publish manually');
        return createdLead;
    }
}
