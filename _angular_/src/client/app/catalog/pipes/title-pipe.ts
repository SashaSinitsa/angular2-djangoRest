// not used
import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'TitlePipe'
})


export class TitlePipe  implements PipeTransform {
  transform(items: any[], arg?: string) {
    if (!items) return null;
    if (!arg) return items;
    return items.filter(item =>
      (item.title.indexOf(arg) !== -1) || (item.number.indexOf(arg) !== -1));
  }
}
