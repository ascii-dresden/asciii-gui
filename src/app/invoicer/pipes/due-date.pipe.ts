import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {

  transform(date: Date, days: number = 14): any {
    return date.setDate(date.getDate() + days);
  }

}
