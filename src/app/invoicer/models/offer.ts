export class Offer {

  constructor(private _project) {
    this._name = _project.event.name;
    this._client = _project.client.full_name;
    this._date = this.parseDate(_project.offer.date, 'dd.mm.yyyy');
    this._number = _project.offer.number;
    this._balance = _project.offer.net_total;
    this._sent = _project.checks.ready_for_offer && !_project.checks.ready_for_invoice && !_project.checks.ready_for_archive;
    this._approved = _project.checks.ready_for_offer && _project.checks.ready_for_invoice && !_project.checks.ready_for_archive;
    this._rejected = _project.checks.ready_for_offer && !_project.checks.ready_for_invoice && _project.checks.ready_for_archive;
  }

  private _name;

  get name() {
    return this._name;
  }

  private _client;

  get client() {
    return this._client;
  }

  private _date;

  get date() {
    return this._date;
  }

  private _number;

  get number() {
    return this._number;
  }

  private _balance;

  get balance() {
    return this._balance;
  }

  private _sent;

  get sent() {
    return this._sent;
  }

  private _approved;

  get approved() {
    return this._approved;
  }

  private _rejected;

  get rejected() {
    return this._rejected;
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
