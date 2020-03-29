import { Pipe, PipeTransform } from '@angular/core';
import { Notice } from '../api-models';

@Pipe({
  name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {

  transform(value: Notice[], price: number, moreOrLess: string): Notice[] {

    if (moreOrLess === 'more') {
      return value.filter(el => {

        if (!price && price!==0) {
          return value;
        } else {
          return el['price'] >= price;
        }
      });
    } else if (moreOrLess === 'less') {
      return value.filter(el => {
        if (!price && price!==0) {
          return value;
        }
         else {
          return el['price'] <= price;
        }
      });
    }
  }


}
