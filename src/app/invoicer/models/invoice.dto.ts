import { InvoicerUtils } from './invoicer-utils';
import { Project } from './project';

export enum InvoiceStatus {
  Open,                   // 0
  PaidAll,                // 1
  OpenPaymentToEmployees, // 2
  Overdue                 // 3
}


export class InvoiceDTO {

  private _id: string;
  private _name: string;
  private _client: string;
  private _date: number | undefined;
  private _overdue: boolean;
  private _number: string | undefined;
  private _net: number;
  private _gross: number;
  private _serviceWage: number;
  private _status: InvoiceStatus;

  constructor(project: Project) {
    this._id = project.id;
    this._name = project.name;
    this._client = project.client.name;
    this._date = project.invoice.date;
    this._overdue = InvoicerUtils.isOverdue(this._date);
    this._number = project.invoice.number;
    this._net = project.invoice.net;
    this._gross = project.invoice.gross;
    this._serviceWage = project.service.gross;
    if (project.paidByCustomer && project.paidEmployees) {
      this._status = InvoiceStatus.PaidAll;
    } else if (!project.paidByCustomer) {
      this._status = this._overdue ? InvoiceStatus.Overdue : InvoiceStatus.Open;
    } else if (!project.paidEmployees) {
      this._status = project.service.time ? InvoiceStatus.OpenPaymentToEmployees : InvoiceStatus.PaidAll;
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

  get date(): number | undefined {
    return this._date;
  }

  get overdue(): boolean {
    return this._overdue;
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

  get serviceWage(): number {
    return this._serviceWage;
  }

  get status(): InvoiceStatus {
    return this._status;
  }
}
