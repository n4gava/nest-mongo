import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLeadsQuery } from '../impl/get-leads.query/get-leads.query';
import { LeadsRepository } from '../../repositories/leads.repository';
import { Lead } from '../../domain/lead.domain';

@QueryHandler(GetLeadsQuery)
export class GetLeadsHandler implements IQueryHandler<GetLeadsQuery> {
    
    constructor(private leadsRepository: LeadsRepository) {}
    
    
    async execute(query: GetLeadsQuery): Promise<Lead[]> {
        return this.leadsRepository.findAll();
    }
}
