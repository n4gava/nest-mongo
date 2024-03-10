import { AggregateRoot } from "@nestjs/cqrs";

export class Lead extends AggregateRoot {
  constructor(
    private _name: string,
    private _email: string,
    private _phone: string,
    ) {
    super();
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
