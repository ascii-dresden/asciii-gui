import { Project } from './project';

export enum OfferStatus {
  Pending,
  Approved,
  Canceled
}

export class OfferDTO {

  private _id: string;
  private _name: string;
  private _client: string;
  private _manager: string;
  private _date: number;
  private _number: string;
  private _net: number;
  private _gross: number;
  private _status: OfferStatus;

  constructor(project: Project) {
    this._id = project.id;
    this._name = project.name;
    this._client = project.client.name;
    this._manager = project.manager;
    this._date = project.offer.date;
    this._number = project.offer.number;
    this._net = project.offer.net;
    this._gross = project.offer.gross;
    if (project.canceled) {
      this._status = OfferStatus.Canceled;
    } else if (project.readyForOffer && !project.readyForInvoice) {
      this._status = OfferStatus.Pending;
    } else if (project.readyForInvoice) {
      this._status = OfferStatus.Approved;
    }
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

  get status(): OfferStatus {
    return this._status;
  }
}
