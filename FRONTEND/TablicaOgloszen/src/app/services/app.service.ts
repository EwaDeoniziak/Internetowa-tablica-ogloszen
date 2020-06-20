import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Notice } from '../shared/api-models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  categoriesVisible = new BehaviorSubject<boolean>(false);
  category = new  BehaviorSubject<Category>(null);

  getCategoryRightName(category: Category): string{
    if(category.name === 'real-estate'){
      return 'Nieruchomości';
    }
    else if(category.name === 'fashion-and-beauty'){
      return 'Moda i uroda';
    }
    else if(category.name === 'house-and-garden'){
      return 'Dom i ogród';
    }
    else if(category.name === 'education'){
      return 'Edukacja';
    }
    else if(category.name === 'sport'){
      return 'Sport';
    }
    else if(category.name === 'electronic'){
      return 'Elektronika';
    }
    else if(category.name === 'kid'){
      return 'Dziecko';
    }
    else if(category.name === 'motorization'){
      return 'Motoryzacja';
    }
    else if(category.name === 'pets'){
      return 'Zwierzęta';
    }
  }

  getCategoryIcon(category: Category){
    if(category.name === 'real-estate'){
      return 'home_work';
    }
    else if(category.name === 'fashion-and-beauty'){
      return 'watch';
    }
    else if(category.name === 'house-and-garden'){
      return 'weekend';
    }
    else if(category.name === 'education'){
      return 'book';
    }
    else if(category.name === 'sport'){
      return 'sports_soccer';
    }
    else if(category.name === 'electronic'){
      return 'tablet_mac';
    }
    else if(category.name === 'kid'){
      return 'child_friendly';
    }
    else if(category.name === 'motorization'){
      return 'directions_car';
    }
    else if(category.name === 'pets'){
      return 'pets';
    }
  }
  getOldNotice(notice: Notice){
    if(!notice.expDate || Date.now()>Date.parse(notice.expDate)){
      return true;
    } else {
      return false;
    }
  }
  getActNotice(notice: Notice){
    if(Date.now()<Date.parse(notice.expDate)){
      return true;
    } else {
      return false;
    }
  }
  constructor() { }
}
