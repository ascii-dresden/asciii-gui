import { InvoicerUtils } from '../invoicer-utils';

export class OfferDTO {

  private _id: string;
  private _name: string;
  private _client: string;
  private _manager: string;
  private _date: number;
  private _number: string;
  private _net: number;
  private _gross: number;
  private _sent: boolean;
  private _approved: boolean;
  private _rejected: boolean;

  constructor(project) {
    this._id = project.id;
    this._name = project.event.name;
    this._client = project.client.full_name;
    this._manager = project.event.manager;
    this._date = InvoicerUtils.parseDate(project.offer.date);
    this._number = project.offer.number;
    this._net = InvoicerUtils.parseCurrency(project.offer.net_total);
    this._gross = InvoicerUtils.parseCurrency(project.offer.gross_total);
    this._sent = project.checks.ready_for_offer && !project.checks.ready_for_invoice && !project.checks.ready_for_archive;
    this._approved = project.checks.ready_for_offer && project.checks.ready_for_invoice && !project.checks.ready_for_archive;
    this._rejected = project.checks.canceled;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get client(): string {
    return this._client;
  }

  get manager(): string {
    return this._manager;
  }

  get date(): number {
    return this._date;
  }

  get number(): string {
    return this._number;
  }

  get net(): number {
    return this._net;
  }

  get gross(): number {
    return this._gross;
  }

  get sent(): boolean {
    return this._sent;
  }

  get approved(): boolean {
    return this._approved;
  }

  get rejected(): boolean {
    return this._rejected;
  }
}
