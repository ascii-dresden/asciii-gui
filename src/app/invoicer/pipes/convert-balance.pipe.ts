import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertBalance' })
export class ConvertBalancePipe implements PipeTransform {

  transform(values: string[]): number {
    const numbers: number[] = [];

    values.forEach(value => {
      // TODO RegEx
      let number = value.replace(',', '.');
      number = number.replace(/\$[0-9,]+(?:\.\d\d)?/g, '');
      number = number.replace('€', '');
      numbers.push(+number);
    });

    return numbers.reduce((a, b) => a + b, 0);
  }
}
