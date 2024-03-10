import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateLeadCommand } from "../create-lead.command";
import { Lead } from "../../domain/lead.domain";
import { LeadsRepository } from "../../repositories/leads.repository";

@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler implements ICommandHandler<CreateLeadCommand> {
    constructor(
        private readonly repository: LeadsRepository,
        private readonly publisher: EventPublisher) {
        
    }

    async execute(command: CreateLeadCommand): Promise<Lead> {
        const { request } = command;
        const lead = new Lead(request.name, request.email, request.phone);
        console.log("repository", this.repository, this.publisher)
        const createdLead = await this.repository.create(lead)
        return createdLead;
    }
}