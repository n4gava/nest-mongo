import { IEvent } from "@nestjs/cqrs";

export class LeadCreatedEvent implements IEvent {
    constructor(public name: string) {

    }
}