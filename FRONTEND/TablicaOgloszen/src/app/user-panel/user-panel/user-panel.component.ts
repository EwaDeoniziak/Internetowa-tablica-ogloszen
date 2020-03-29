import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, AfterViewChecked {

  categoriesVisible: boolean;
  
  constructor(
    private authHttp: AuthService,
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) { }

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

  logout(){
    this.authHttp.logout();
  }
  addNewNotice(){
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['../../../../user-panel/add-notice']);
    } else {
      this.router.navigate(['../../../../main-page/auth']);
    }
  }
}
