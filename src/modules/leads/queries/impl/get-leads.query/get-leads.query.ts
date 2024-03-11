import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Lead } from "src/modules/leads/domain/lead.domain";
import { LeadsRepository } from "src/modules/leads/repositories/leads.repository";

export class GetLeadsQuery {}

@QueryHandler(GetLeadsQuery)
export class GetLeadsHandler implements IQueryHandler<GetLeadsQuery> {
    
    constructor(private leadsRepository: LeadsRepository) {}
    
    
    async execute(query: GetLeadsQuery): Promise<Lead[]> {
        return this.leadsRepository.findAll();
    }
}
