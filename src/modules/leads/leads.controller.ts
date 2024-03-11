import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetLeadsQuery } from './queries/impl/get-leads.query/get-leads.query';
import { CreateLeadCommand } from './commands/create-lead.command';
import CreateLeadDto from './dtos/create-lead.dto';
import { Roles } from 'src/shared/guards/roles.decorator';
import { Public } from 'src/shared/guards/unprotected.decorator';

@Controller('leads')
//@Public()
export class LeadsController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {

    }

    @Get()
    //@Read(["sell_contacts"])
    getAll() {
        return this.queryBus.execute(new GetLeadsQuery());
    }

    @Post()
    //@Write(["sell_contacts"])
    create(@Body() request: CreateLeadDto) {
        return this.commandBus.execute(new CreateLeadCommand(request));
    }
}
