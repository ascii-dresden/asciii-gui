import { InvoicerUtils } from './invoicer-utils';

export class Item {

  private _tax: number;
  private _gross: number;
  private _taxed: boolean;
  private _taxTotal: number;

  constructor(gross: string, tax: number = 0) {
    this._taxed = tax > 0;
    this._tax = tax / 100;
    this._gross = InvoicerUtils.parseCurrency(gross);
    this._taxTotal = this._gross * (this._tax / 100);
  }

  get gross(): number {
    return this._gross;
  }

  get taxed(): boolean {
    return this._taxed;
  }

  get taxTotal(): number {
    return this._taxTotal;
  }

  get tax(): number {
    return this._tax;
  }
}
