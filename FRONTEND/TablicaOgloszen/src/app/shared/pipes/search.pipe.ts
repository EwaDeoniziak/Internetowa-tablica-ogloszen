import { Pipe, PipeTransform } from '@angular/core';
import { Notice } from '../api-models';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Notice[], searchText: string): any {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }

}
