import { Project } from './project';

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

  constructor(project: Project) {
    this._id = project.id;
    this._name = project.name;
    this._client = project.client.name;
    this._manager = project.manager;
    this._date = project.offer.date;
    this._number = project.offer.number;
    this._net = project.offer.net;
    this._gross = project.offer.gross;
    this._sent = project.readyForOffer && !project.readyForInvoice && !project.readyForArchive;
    this._approved = project.readyForOffer && project.readyForInvoice && !project.readyForArchive;
    this._rejected = project.canceled;
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
