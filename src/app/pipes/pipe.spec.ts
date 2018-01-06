import * as moment from 'moment';

import { Invoice } from '../models/index';
import { DueDatePipe } from './due-date.pipe';
import { JoinBillPipe } from './join-bill.pipe';

describe('DueDatePipe', () => {
  let invoice: Invoice;
  let pipe: DueDatePipe;

  beforeEach(() => {
    invoice = new Invoice({
      invoice: {
        date: '10.08.2017',
        number: 'R000',
        number_long: 'R2017-000',
        official: null,
        sums: [
          {
            gross_sum: '57,66€',
            has_tax: true,
            tax_sum: '10,96€',
            tax_value: 19
          },
          {
            gross_sum: '9,00€',
            has_tax: false,
            tax_sum: '0,00€',
            tax_value: 0
          }
        ],
        net_total: '77,62€',
        gross_total: '66,66€'
      }
    });
    pipe = new DueDatePipe();
  });

  afterEach(() => {
    invoice = undefined;
    pipe = undefined;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform invoice date', () => {
    expect(pipe.transform(invoice.date)).toBe(moment('10.08.2017', 'DD.MM.YYYY').add(14, 'days').valueOf());
  });

  it('should transform invoice date w/ optional due date', () => {
    const amount = 30;
    expect(pipe.transform(invoice.date, amount)).toBe(moment('10.08.2017', 'DD.MM.YYYY').add(amount, 'days').valueOf());
  });

  it('should return undefined', () => {
    expect(pipe.transform(null)).toBeUndefined();
  });
});

describe('JoinBillPipe', () => {
  let pipe: JoinBillPipe;
  const bills = [
    { name: 'bill0' },
    { name: 'bill1' },
    { name: 'bill2' },
    { name: 'bill3' }
  ];

  beforeEach(() => {
    pipe = new JoinBillPipe();
  });

  afterEach(() => {
    pipe = undefined;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform Bill array', () => {
    expect(pipe.transform(bills)).toBe('bill0, bill1, bill2, bill3');
  });
});
