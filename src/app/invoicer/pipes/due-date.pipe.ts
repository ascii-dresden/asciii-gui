import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dueDate' })
export class DueDatePipe implements PipeTransform {

  transform(date: number, days: number = 14) {
    const newDate: Date = new Date(date);
    return newDate.setDate(newDate.getDate() + days);
  }
}
