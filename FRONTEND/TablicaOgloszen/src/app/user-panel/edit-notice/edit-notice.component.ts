import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Notice, Category } from 'src/app/shared/api-models';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NoticeBoardComponent } from 'src/app/shared-components/notice-board/notice-board.component';

@Component({
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.component.html',
  styleUrls: ['./edit-notice.component.scss']
})
export class EditNoticeComponent implements OnInit, OnDestroy {

  notice: Notice;
  subscription: Subscription;
  noticeSubscription: Subscription;
  id: string;
  oldImgsURL: Array<string>;

  addNoticeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(25)]),
    description: new FormControl(''),
    price: new FormControl(null, [Validators.required]),
    imgs: new FormControl([]),
    categories: new FormControl(null),
    location: new FormControl('', [Validators.required]),
    type: new FormControl(null),
    newImgs: new FormControl([])
  });

  constructor(private route: ActivatedRoute,
    private _DomSanitizer: DomSanitizer,
    private http: HttpService,
    private appService: AppService,
    private _snackbar: MatSnackBar) {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    this.noticeSubscription = this.http.getOneNotice(this.id).subscribe(el => {
      this.notice = el;
      // console.log(this.notice);
      this.oldImgsURL = this.notice.imgs;
      this.addNoticeForm.patchValue({
        title: this.notice.title,
        description: this.notice.description,
        price: this.notice.price,
        categories: this.notice.categories,
        location: this.notice.location,
        type: this.notice.type,
        imgs: this.notice.imgs
      })
    });
    // console.log(this.addNoticeForm);
    this.http.getCategories().subscribe(res => {
      this.categories = res;
      // console.log(this.categories);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.noticeSubscription.unsubscribe();
  }

  imgUrl: any;
  imagePath: any;
  imgURL: any[] = [];

  files: File[] = [];

  //categories
  categories: Category[] = [];

  // title: string;
  // description: string;
  // price: string;

  addNewNotice(event) {
    // console.log(this.addNoticeForm);
    if (this.addNoticeForm.valid) {
      const formData = new FormData();

      const title = this.addNoticeForm.get('title').value;
      const description = this.addNoticeForm.get('description').value;
      const price = this.addNoticeForm.get('price').value;
      const imgs = this.addNoticeForm.get('imgs').value;
      const newImgs = this.addNoticeForm.get('newImgs').value;
      const location = this.addNoticeForm.get('location').value;
      let type = this.addNoticeForm.get('type').value;
      type = parseInt(type, 10);
      const categories = this.addNoticeForm.get('categories').value;
      // console.log(imgs);
      if ( this.imgURL.length > 0 && newImgs.length > 0) {
        newImgs.forEach(element => {
          formData.append('newImgs', element, element.name);
        });
      }
      if ( this.oldImgsURL.length > 0) {
        imgs.forEach(element => {
          formData.append('imgs', element);
        });
      }
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('location', location);
      formData.append('type', type);
      formData.append('categories', categories._id);
      // console.log(this.addNoticeForm);
      // console.log(formData);
      // console.log(categories);

      imgs.forEach(element => {
        // console.log('Zdjecie z formGroup' + element.name);
      });
      this.http.updateNotice(this.id, formData).subscribe(res => {
        // console.log(res);
        this.message = 'Twoje ogłoszenie zostało edytowane';
        this.openSnackBar();
      }, err => {
        this.message = 'Coś poszło nie tak';
        this.openSnackBar();
      });
    }
  }


  async onFilesSelected(event) {
    if (event.target.files.length + this.files.length + this.oldImgsURL.length < 7) {
      for (let index = 0; index < event.target.files.length; index++) {
        // console.log(event);
        this.files.push(event.target.files[index]);

        let count = this.files.length - 1;
        // console.log(count);
        // console.log(this.files[count]);
        // console.log(event.target.files[index]);

        try {
          const fileContents = await this.readFile(this.files[count]);
          // console.log(fileContents);
          this.imgURL.push(fileContents);
        } catch (e) {
          console.warn(e.message);
        }
      }
    }
    // console.log('Zdjęcia wyświetlane po kolei: ' + this.imgURL);
    // console.log(this.files);
    this.addNoticeForm.patchValue({ newImgs: this.files });
    // console.log(this.addNoticeForm.get('imgs'));
    // console.log(this.addNoticeForm.get('newImgs'));
  }



  readFile(event) {
    var reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(event);
    });
  }

  removeOldPhoto(index: number) {
    this.oldImgsURL.splice(index, 1);
    // console.log(this.oldImgsURL)    
    // console.log(this.addNoticeForm.get('imgs'));

  }

  removeNewPhoto(index: number) {
    console.log(index);
    this.imgURL.splice(index, 1);
    this.addNoticeForm.get('newImgs').value.splice(index, 1);
    // console.log(this.addNoticeForm.get('newImgs'));
    // console.log(this.imgURL);
  }

  //categories
  getCategoryRightName(category: Category): string {
    return this.appService.getCategoryRightName(category);
  }

  message = 'Ok';
  action = '';
  openSnackBar() {
    this._snackbar.open(this.message, this.action, {
      duration: 5000,
    });
  }
}
