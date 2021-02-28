import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFiter'
})
export class TableFiterPipe implements PipeTransform {

  transform(list: any[], value: string): any {
    return value ? list.filter(item => item.clientName.includes(value)) : list;
  }

}
