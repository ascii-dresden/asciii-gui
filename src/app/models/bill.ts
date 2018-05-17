import { InvoicerUtils } from './invoicer-utils';

export class Bill {

  private _cost: number;
  private _price: number;

  constructor(private _type: BillType, private _name: string, price: string, private _unit: string, private _amount: number,
    private _tax: number) {
    this._price = InvoicerUtils.parseCurrency(price);
    this._cost = this._price * _amount;
  }

  get cost(): number {
    return this._cost;
  }

  get type(): BillType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get unit(): string {
    return this._unit;
  }

  get amount(): number {
    return this._amount;
  }

  get tax(): number {
    return this._tax;
  }
}

export enum BillType {
  Offered, Invoiced
}
