import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertBalance' })
export class ConvertBalancePipe implements PipeTransform {

  transform(values: string[] | string): number {
    const numbers: number[] = [];

    for (let value of values) {
      // TODO RegEx
      value = value.replace(',', '.');
      value = value.replace(/\$[0-9,]+(?:\.\d\d)?/g, '');
      value = value.replace('€', '');
      numbers.push(+value);
    }

    return numbers.reduce((a, b) => a + b, 0);
  }
}
