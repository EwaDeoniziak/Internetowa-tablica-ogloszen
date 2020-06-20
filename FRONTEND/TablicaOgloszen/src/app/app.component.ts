import { Component, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { HttpService } from './services/http.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private httpService: HttpService, 
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string){
    this.httpService.getNotices().subscribe(el=> {
      // console.log(el);
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
}
