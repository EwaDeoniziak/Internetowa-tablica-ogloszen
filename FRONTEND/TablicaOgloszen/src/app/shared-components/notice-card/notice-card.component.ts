import { Component, OnInit, Input } from '@angular/core';
import { Notice, Category } from 'src/app/shared/api-models';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-notice-card',
  templateUrl: './notice-card.component.html',
  styleUrls: ['./notice-card.component.scss']
})
export class NoticeCardComponent implements OnInit {

  constructor(
    private _DomSanitizer: DomSanitizer,
    private appService: AppService) { }

  @Input() item: Notice;

  ngOnInit() {
    // console.log(this.item);
  }

  getShortDescription(descripton: string): string {
    if (descripton.length < 100) {
      return descripton;
    } else {
      return descripton.slice(0, 100) + '...';
    }
  }

  getCategoryRightName(category: Category): string {
    return this.appService.getCategoryRightName(category);
  }

}
