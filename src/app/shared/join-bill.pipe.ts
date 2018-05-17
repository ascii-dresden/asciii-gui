import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinBillPipe implements PipeTransform {

  transform(values: any[]): string {
    return values.map(v => v.name).join(', ');
  }
}
