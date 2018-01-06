import { InvoicerUtils } from './invoicer-utils';
import { Item } from './item';

export class Offer {

  private _number: string;
  private _date: number;
  private _net: number;
  private _gross: number;
  private _items: Item[] = [];

  constructor(project) {
    this._number = project.offer.number;
    this._date = InvoicerUtils.parseDate(project.offer.date);
    this._net = InvoicerUtils.parseCurrency(project.offer.net_total);
    this._gross = InvoicerUtils.parseCurrency(project.offer.gross_total);
    project.offer.sums.forEach(s => this._items.push(new Item(s.gross_sum, s.tax_value)));
  }

  get number(): string {
    return this._number;
  }

  get date(): number {
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
