import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Notice, Category } from 'src/app/shared/api-models';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.component.html',
  styleUrls: ['./edit-notice.component.scss']
})
export class EditNoticeComponent implements OnInit, OnDestroy {

  notice:Notice;
  subscription: Subscription;
  noticeSubscription: Subscription;
  id: string;

  addNoticeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.max(25)]),
    description: new FormControl(''),
    price: new FormControl(null, [Validators.required]),
    imgs: new FormControl([]),
    categories: new FormControl(null),
    location: new FormControl('', [Validators.required]),
    type: new FormControl(null),
  });

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private appService: AppService,
    private _snackbar: MatSnackBar) {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    this.noticeSubscription = this.http.getOneNotice(this.id).subscribe(el => {
      this.notice = el;
      // console.log(this.notice);
      this.addNoticeForm.patchValue({
        title: this.notice.title,
        description: this.notice.description,
        price: this.notice.price,
        categories: this.notice.categories,
        location: this.notice.location,
        type: this.notice.type,
        imgs: this.notice.imgs})
   });

    this.http.getCategories().subscribe(res => {
     this.categories = res;
     // console.log(this.categories);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
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

  addNewNotice(event){
    if(this.addNoticeForm.valid){
    const formData = new FormData();

    const title = this.addNoticeForm.get('title').value;
    const description = this.addNoticeForm.get('description').value;
    const price = this.addNoticeForm.get('price').value;
    const imgs = this.addNoticeForm.get('imgs').value;
    const location = this.addNoticeForm.get('location').value;
    let type = this.addNoticeForm.get('type').value;
    type = parseInt(type, 10);
    const categories = this.addNoticeForm.get('categories').value;
    // console.log(type)
    if(imgs.length>0){
    imgs.forEach(element => {
      formData.append('imgs', element, element.name);
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
  

  onFilesSelected(event) {
    if(event.target.files.length+this.files.length <7){
      for(let index = 0; index < event.target.files.length; index++){
        
        this.files.push(event.target.files[index]);
        let count = this.files.length - 1;
        // console.log(count);
        // console.log(this.files[count]);
        // console.log(event.target.files[index]);
        var reader = new FileReader();
        reader.readAsDataURL(this.files[count]); 
        reader.onload = (_event: any) => { 
          // console.log(_event);
          this.imgURL.push(_event.target.result);
          // console.log(this.imgURL[count]);
      }    }
    }
      // console.log(this.imgURL);
      // console.log(this.files);
      this.addNoticeForm.patchValue({imgs: this.files});
      // console.log(this.addNoticeForm.get('imgs').value);
    }

    onFileSelected(event) {
      if(this.files.length <7){
          // console.log(event.target.files[0])
          this.files.push(event.target.files[0]);
          let count = this.files.length - 1;
          // console.log(count);
          // console.log(this.files[count]);
          // console.log(event.target.files[0]);
          var reader = new FileReader();
          reader.readAsDataURL(this.files[count]); 
          reader.onload = (_event: any) => { 
            // console.log(_event);
            this.imgURL.push(_event.target.result);
            // console.log(this.imgURL[count]);
        }    }
      
        //console.log(this.imgURL);
        //console.log(this.files);
        this.addNoticeForm.patchValue({imgs: this.files});
        //console.log(this.addNoticeForm.get('imgs').value);
      }


  //categories
      getCategoryRightName(category: Category): string{
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
