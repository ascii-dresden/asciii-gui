import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {

  transform(date: number, days: number = 14): number {
    return date + 1209600000;
  }

}
