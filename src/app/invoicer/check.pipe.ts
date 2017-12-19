import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'check'
})
export class CheckPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>';
  }
}
