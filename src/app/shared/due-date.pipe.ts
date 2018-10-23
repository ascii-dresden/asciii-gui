import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dueDate' })
export class DueDatePipe implements PipeTransform {

  transform(date: number, days: number = 14) {
    if (date) {
      return moment(date).add(days, 'days').valueOf();
    } else {
      return undefined;
    }
  }
}
