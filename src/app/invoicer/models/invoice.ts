export class Invoice {

  private _id: string;
  private _name: string;
  private _client: string;
  private _date: Date | null;
  private _number: string;
  private _balance: string;
  private _sent: boolean;
  private _payedByCustomer: boolean;
  private _payedEmployees: boolean;

  constructor(private _project) {
    this._id = _project.id;
    this._name = _project.event.name;
    this._client = _project.client.full_name;
    this._date = _project.invoice.date;
    this._number = _project.invoice.number_long;
    this._balance = _project.invoice.net_total;
    this._sent = _project.checks.ready_for_offer && _project.checks.ready_for_invoice &&
      !_project.checks.payed_by_customer && !_project.checks.payed_employees;
    this._payedByCustomer = _project.checks.payed_by_customer;
    this._payedEmployees = _project.checks.payed_employees;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }


  get client() {
    return this._client;
  }


  get date() {
    return this._date;
  }


  get number() {
    return this._number;
  }


  get balance() {
    return this._balance;
  }


  get sent() {
    return this._sent;
  }


  get payedByCustomer() {
    return this._payedByCustomer;
  }


  get payedEmployees() {
    return this._payedEmployees;
  }
}
