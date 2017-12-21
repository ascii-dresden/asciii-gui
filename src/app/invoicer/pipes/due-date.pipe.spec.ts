import { DueDatePipe } from './due-date.pipe';

describe('DueDatePipe', () => {
  it('create an instance', () => {
    const pipe = new DueDatePipe();
    expect(pipe).toBeTruthy();
  });
});
