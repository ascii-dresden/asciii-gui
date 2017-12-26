import { InvoicerUtils } from '../invoicer-utils';

export class InvoiceDTO {

  private _id: string;
  private _name: string;
  private _client: string;
  private _date: number | null;
  private _number: string | null;
  private _gross: number;
  private _sent: boolean;
  private _payedByCustomer: boolean;
  private _payedEmployees: boolean;

  constructor(project) {
    this._id = project.id;
    this._name = project.event.name;
    this._client = project.client.full_name;
    this._date = InvoicerUtils.parseDate(project.invoice.date);
    this._number = project.invoice.number_long;
    this._gross = InvoicerUtils.parseCurrency(project.invoice.gross_total);
    this._sent = project.checks.ready_for_offer && project.checks.ready_for_invoice &&
      !project.checks.payed_by_customer && !project.checks.payed_employees;
    this._payedByCustomer = project.checks.payed_by_customer;
    this._payedEmployees = project.checks.payed_employees;
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

  get date(): number | null {
    return this._date;
  }

  get number(): string | null {
    return this._number;
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
