import { Employee } from './employee';
import { InvoicerUtils } from '../invoicer-utils';

export class Service {

  private _salary: number;
  private _net: number;
  private _gross: number;
  private _employees: Employee[] = [];

  constructor(private _time: number, private _tax: number, salary: string, employees) {
    this._salary = InvoicerUtils.parseCurrency(salary);
    this._net = _time * this._salary;
    this._gross = _time * this._salary * ((_tax || 0.19) + 1);
    employees.forEach(e => this._employees.push(new Employee(e.name, e.salary, e.time)));
  }

  get net(): number {
    return this._net;
  }

  get gross(): number {
    return this._gross;
  }

  get time(): number {
    return this._time;
  }

  get tax(): number {
    return this._tax;
  }

  get salary(): number {
    return this._salary;
  }

  get employees(): Employee[] {
    return this._employees;
  }
}
