import { InjectModel } from '@nestjs/mongoose';
import { Lead } from '../../domain/lead.domain';
import { LeadsRepository } from '../leads.repository';
import mongoose from 'mongoose';
import { LeadSchema, LeadSchemaFactory } from '../../schema/lead.schema';
import { SessionContext } from 'src/shared/cls/session.cls';

export class MongoLeadsRepository extends LeadsRepository {
    constructor(
        @InjectModel(Lead.name) private leadModel: mongoose.Model<Lead>,
        private readonly session: SessionContext,
    ) {
        super();
    }

    findAll(): Promise<Lead[]> {
        const { tenantId } = this.session.get();
        const query = this.leadModel.find({ tenantId: tenantId });
        return query.exec();
    }

    create(lead: Lead): Promise<Lead> {
        const { tenantId } = this.session.get();
        
        lead['tenantId'] = tenantId;

        const leadSchema: LeadSchema = {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            tenantId: lead.tenantId,
        };
        return this.leadModel.create(leadSchema);
    }
}
