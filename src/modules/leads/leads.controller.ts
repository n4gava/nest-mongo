import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetLeadsQuery } from './queries/impl/get-leads.query/get-leads.query';
import { CreateLeadCommand } from './commands/create-lead.command';
import CreateLeadDto from './dtos/create-lead.dto';
import { Roles } from 'src/shared/guards/roles.decorator';

@Controller('leads')
export class LeadsController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {

    }

    @Get()
    //@Roles(["read"])
    getAll() {
        return this.queryBus.execute(new GetLeadsQuery());
    }

    @Post()
    //@Roles(["write"])
    create(@Body() request: CreateLeadDto) {
        return this.commandBus.execute(new CreateLeadCommand(request));
    }
}
