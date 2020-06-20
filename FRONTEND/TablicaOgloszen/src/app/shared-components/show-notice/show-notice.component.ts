import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Notice, Category } from './../../shared/api-models';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-show-notice',
  templateUrl: './show-notice.component.html',
  styleUrls: ['./show-notice.component.scss']
})
export class ShowNoticeComponent implements OnInit {
  //router
  id: string;
  subscription: Subscription;
  noticeSubsription: Subscription;
  notice: Notice;
  displayedImg: DisplayedImg;
  isLastImg = false;
  isFirstImg = false;

  constructor(private route: ActivatedRoute, private http: HttpService,
              private _DomSanitizer: DomSanitizer,
              private appService: AppService) {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    this.noticeSubsription = this.http.getOneNotice(this.id).subscribe(el => {
      this.notice = el;
      // console.log(this.notice);
      if (this.notice.imgs.length > 0) {
        this.displayedImg = {
          path: this.notice.imgs[0],
          index: 0
        };
        this.isFirstImg = true;
        if (this.notice.imgs.length === 1) {
          this.isLastImg = true;
        }
        // console.log(this.displayedImg.index)
      }
    });
  }

  getCategoryRightName(category: Category): string {
    return this.appService.getCategoryRightName(category);
  }

  ngOnInit() {
  }

  changeDisplayedImg(path: string, i: number) {
    if (this.notice.imgs.length > 1) {
      this.displayedImg = {
        path: path,
        index: i
      };
      // console.log(this.displayedImg.index);
      const displayedImgId = this.displayedImg.index;
      if (displayedImgId === 0) {
        this.isFirstImg = true;
        this.isLastImg = false;
        // console.log(this.isFirstImg);
      }
      if (this.notice.imgs.length === displayedImgId + 1) {
        this.isLastImg = true;
        this.isFirstImg = false;
        // console.log(this.isLastImg);
      }
      if (displayedImgId !== 0 && this.notice.imgs.length !== displayedImgId + 1) {
        this.isFirstImg = false;
        this.isLastImg = false;
      }
    }

  }

  nextImg() {
    const lastImgId = this.notice.imgs.length - 1;
    const displayedImgId = this.displayedImg.index;
    if (this.notice.imgs[lastImgId] !== this.displayedImg.path) {
      this.displayedImg = {
        index: displayedImgId + 1,
        path: this.notice.imgs[displayedImgId + 1]
      };
      this.isFirstImg = false;
      // console.log(this.displayedImg.index)
      if (this.notice.imgs.length === displayedImgId + 2) {
        this.isLastImg = true;
      }
    }
  }
  prevImg() {
    const displayedImgId = this.displayedImg.index;
    if (displayedImgId !== 0) {
      this.displayedImg = {
        index: displayedImgId - 1,
        path: this.notice.imgs[displayedImgId - 1]
      };
      this.isLastImg = false;
      if (displayedImgId - 1 === 0) {
        this.isFirstImg = true;
      }
    }
  }
  getOldNotice(notice: Notice) {
    return this.appService.getOldNotice(notice);
  }

}
export interface DisplayedImg {
  path: string;
  index: number;
}
