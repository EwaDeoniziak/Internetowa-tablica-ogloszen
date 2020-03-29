import { Pipe, PipeTransform } from '@angular/core';
import { Notice } from '../api-models';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {

  transform(value: Notice[], propertyName: string, propertyValue: any): Notice[] {
    if(!propertyName || !propertyValue){
      return value;
    }
    else {
    value = value.filter( el => {
      if(el[propertyName]){
        return el[propertyName] === propertyValue;
      } else {
        return false;
      }
    }
    );
    console.log(value);
    return value;
};
    
  }


}
