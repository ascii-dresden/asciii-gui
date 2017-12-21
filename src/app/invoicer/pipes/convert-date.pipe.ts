import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertDate' })
export class ConvertDatePipe implements PipeTransform {

  transform(input, format = 'dd.mm.yyyy') {
    const parts = input.match(/(\d+)/g);
    const fmt: any = {};
    let i = 0;
    format = format || 'yyyy-mm-dd';
    format.replace(/(yyyy|dd|mm)/g, part => fmt[part] = String(i++));

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
  }
}
