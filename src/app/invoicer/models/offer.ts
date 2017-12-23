const tr = { 'ä': 'ae', 'ü': 'ue', 'ö': 'oe', 'ß': 'ss' };

export class Offer {

  private _id: string;
  private _name: string;
  private _client: string;
  private _date: Date;
  private _number: string;
  private _balance: string;
  private _sent: boolean;
  private _approved: boolean;
  private _rejected: boolean;

  constructor(private _project) {
    this._name = _project.event.name;
    this._client = _project.client.full_name;
    this._date = _project.offer.date;
    this._number = _project.offer.number;
    this._balance = _project.offer.net_total;
    this._sent = _project.checks.ready_for_offer && !_project.checks.ready_for_invoice && !_project.checks.ready_for_archive;
    this._approved = _project.checks.ready_for_offer && _project.checks.ready_for_invoice && !_project.checks.ready_for_archive;
    this._rejected = _project.checks.canceled;
    this._id = `${this._date.getFullYear()}-${this.normalizeEventName()}`;
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


  get approved() {
    return this._approved;
  }


  get rejected() {
    return this._rejected;
  }

  private normalizeEventName(): string {
    return this._name.replace(/[äöüß]/g, $0 => tr[$0]).replace(' ', '-');
  }
}
