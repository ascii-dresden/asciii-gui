import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {

  transform(values: string[]): string {
    return values.join(' ');
  }
}
