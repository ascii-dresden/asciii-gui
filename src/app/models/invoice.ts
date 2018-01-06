import { InvoicerUtils } from './invoicer-utils';
import { Item } from './item';

export class Invoice {

  private _number: string | null;
  private _date: number | null;
  private _net: number;
  private _gross: number;
  private _items: Item[] = [];

  constructor(project: any) {
    this._number = project.invoice.number_long;
    this._date = InvoicerUtils.parseDate(project.invoice.date);
    this._net = InvoicerUtils.parseCurrency(project.invoice.net_total);
    this._gross = InvoicerUtils.parseCurrency(project.invoice.gross_total);
    project.invoice.sums.forEach(s => this._items.push(new Item(s.gross_sum, s.tax_value)));
  }

  get number(): string | null {
    return this._number;
  }

  get date(): number | null {
    return this._date;
  }

  get net(): number {
    return this._net;
  }

  get gross(): number {
    return this._gross;
  }

  get items(): Item[] {
    return this._items;
  }
}
