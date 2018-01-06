export class Client {

  constructor(private _name: string, private _address: string, private _email: string) { }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  get email(): string {
    return this._email;
  }
}
