export class Invoice {

  private _name;
  private _client;
  private _date;
  private _number;
  private _balance;
  private _sent;
  private _payedByCustomer;
  private _payedEmployees;

  constructor(private _project) {
    this._name = _project.event.name;
    this._client = _project.client.full_name;
    this._date = this.parseDate(_project.invoice.date, 'dd.mm.yyyy');
    this._number = _project.invoice.number_long;
    this._balance = _project.invoice.net_total;
    this._sent = _project.checks.ready_for_offer && _project.checks.ready_for_invoice &&
      !_project.checks.payed_by_customer && !_project.checks.payed_employees;
    this._payedByCustomer = _project.checks.payed_by_customer;
    this._payedEmployees = _project.checks.payed_employees;
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

  private parseDate(input, format): Date {
    if (!input) {
      return null;
    }

    const parts = input.match(/(\d+)/g), fmt = {};
    let i = 0;
    format = format || 'yyyy-mm-dd';
    format.replace(/(yyyy|dd|mm)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
  }
}
