import { Pipe, PipeTransform } from '@angular/core';
import { Notice, Category } from '../api-models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Notice[], propertyName: string, propertyValue: Category): Notice[] {
    if(!propertyName || !propertyValue){
      return value;
    }
    else {
    value = value.filter( el => {
      const category: Category = el[propertyName];
      if(category){
        //console.log(category._id === propertyValue._id);
        return category._id === propertyValue._id;
      } else {
        return false;
      }
    }
    );
    //console.log(value);
    return value;
};
    
  }

}
