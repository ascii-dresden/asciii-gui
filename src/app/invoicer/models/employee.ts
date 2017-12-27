import { InvoicerUtils } from './invoicer-utils';

export class Employee {

  private _salary: number;
  private _wage: number;

  constructor(private _name: string, salary: string, private _time: number) {
    this._salary = InvoicerUtils.parseCurrency(salary);
    this._wage = this._salary * _time;
  }

  get name(): string {
    return this._name;
  }

  get salary(): number {
    return this._salary;
  }

  get time(): number {
    return this._time;
  }

  get wage(): number {
    return this._wage;
  }
}
