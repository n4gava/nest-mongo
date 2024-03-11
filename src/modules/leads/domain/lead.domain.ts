import { AggregateRoot } from "@nestjs/cqrs";
import { LeadCreatedEvent } from "../events/lead-created.event";

export class Lead extends AggregateRoot {
  constructor(
    private _name: string,
    private _email: string,
    private _phone: string,
    ) {
    super();
    this.apply(new LeadCreatedEvent(_name));
  }

  tenantId: string;

  public get name() {
    return this._name
  }

  public get email() {
    return this._email
  }

  public get phone() {
    return this._phone
  }

  public changeName(name: string) {
    this._name = name;
  }

  public changeContact(email: string, phone: string) {
    this._email = email;
    this._phone = phone;
  }
}
