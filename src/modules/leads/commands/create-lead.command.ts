import CreateLeadDto from "../dtos/create-lead.dto";

export class CreateLeadCommand {
    constructor(public request: CreateLeadDto)
    {

    }
}