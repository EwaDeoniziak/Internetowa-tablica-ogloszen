import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/api-models';
import { HttpService } from 'src/app/services/http.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewChecked {
  categoriesVisible: boolean;
  categories: Category[] = [];

  category:Category;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private appService: AppService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private httpService: HttpService) {
      this.httpService.getCategories().subscribe(res => {
        this.categories = res;
        this.category = this.categories[0];
        this.appService.category.next(this.category);
      });
   }

   onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }

  ngOnInit() {
    
  }

  ngAfterViewChecked(){
    this.appService.categoriesVisible.subscribe(el => {
      this.categoriesVisible = el;
    });
    this.cdr.detectChanges();
  }

  addNewNotice(){
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['../../../../user-panel/add-notice']);
    } else {
      this.router.navigate(['../../../../main-page/auth']);
    }
  }
  myAccountNavigate(){
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['../../../../user-panel']);
    } else {
      this.router.navigate(['../../../../main-page/auth']);
    }
  }

  getCategoryRightName(category: Category){
    return this.appService.getCategoryRightName(category);
  }

  getCategoryIcon(category: Category){
    return this.appService.getCategoryIcon(category);
  }

  changeCategory(category: Category){
    this.category = category;
    this.appService.category.next(category);
  }

}
