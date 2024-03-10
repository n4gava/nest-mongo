import { Lead } from "../domain/lead.domain";

export abstract class LeadsRepository {
    
    abstract findAll(): Promise<Lead[]>;

    abstract create(lead: Lead): Promise<Lead>;
}