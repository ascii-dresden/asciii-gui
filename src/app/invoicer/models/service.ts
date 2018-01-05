import { Employee } from './employee';

export class Service {

  private _tax: number;
  private _employees: Employee[] = [];
  private _time: number;
  private _salary: number;
  private _net: number;
  private _gross: number;

  constructor(tax: number, employees) {
    this._tax = tax || 0;
    employees.forEach(e => this._employees.push(new Employee(e.name, e.salary, e.time)));
    this._time = this._employees.map(e => e.time).reduce((a, b) => a + b, 0);
    this._salary = this._employees.length ? this._employees[0].salary : 9;
    this._gross = this._time * this._salary;
    this._net = this._time * this._salary * (this._tax + 1);
  }

  get tax(): number {
    return this._tax;
  }

  get employees(): Employee[] {
    return this._employees;
  }

  get time(): number {
    return this._time;
  }

  get salary(): number {
    return this._salary;
  }

  get net(): number {
    return this._net;
  }

  get gross(): number {
    return this._gross;
  }
}
