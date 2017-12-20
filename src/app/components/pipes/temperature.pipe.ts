import { Pipe, PipeTransform } from '@angular/core';

const locales = [
  { localeCode: 'de', unit: 'C' }
];

@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {

  transform(value: number | string): string {
    return '';
  }
}
