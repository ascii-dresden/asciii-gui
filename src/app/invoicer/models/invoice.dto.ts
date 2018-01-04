import { Project } from './project';

export class InvoiceDTO {

  private _id: string;
  private _name: string;
  private _client: string;
  private _date: number | undefined;
  private _number: string | undefined;
  private _net: number;
  private _gross: number;
  private _sent: boolean;
  private _payedByCustomer: boolean;
  private _payedEmployees: boolean;

  constructor(project: Project) {
    this._id = project.id;
    this._name = project.name;
    this._client = project.client.name;
    this._date = project.invoice.date;
    this._number = project.invoice.number;
    this._net = project.invoice.net;
    this._gross = project.invoice.gross;
    this._sent = project.readyForInvoice && !project.payedByCustomer;
    this._payedByCustomer = project.payedByCustomer;
    this._payedEmployees = project.payedEmployees;
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

  get date(): number | undefined {
    return this._date;
  }

  get number(): string | undefined {
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

  get payedByCustomer(): boolean {
    return this._payedByCustomer;
  }

  get payedEmployees(): boolean {
    return this._payedEmployees;
  }
}
