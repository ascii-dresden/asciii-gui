import { Bill } from '../models';
import { DueDatePipe } from './due-date.pipe';
import { JoinBillPipe } from './join-bill.pipe';

describe('DueDatePipe', () => {
  let pipe: DueDatePipe;

  beforeEach(() => {
    pipe = new DueDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform invoice date', () => {
    expect(pipe.transform(1489359600000)).toBe(1490565600000);
  });

  it('should transform invoice date w/ optional due date', () => {
    expect(pipe.transform(1489359600000, 30)).toBe(1491948000000);
  });
});

describe('JoinBillPipe', () => {
  let pipe: JoinBillPipe;
  const bills = [
    { name: 'bill0' },
    { name: 'bill1' },
    { name: 'bill2' },
    { name: 'bill3' },
  ];

  beforeEach(() => {
    pipe = new JoinBillPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform Bill array', () => {
    expect(pipe.transform(bills)).toBe('bill0, bill1, bill2, bill3');
  });
});
