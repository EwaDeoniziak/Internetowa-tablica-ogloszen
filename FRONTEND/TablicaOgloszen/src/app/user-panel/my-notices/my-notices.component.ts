import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { User, Notice } from 'src/app/shared/api-models';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogModel, DeleteConfirmComponent } from './../delete-confirm/delete-confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-my-notices',
  templateUrl: './my-notices.component.html',
  styleUrls: ['./my-notices.component.scss']
})
export class MyNoticesComponent implements OnInit {
  user: User; 
  result='';
  notices: Notice[];
  oldNotices: Notice[];
  spinnerActive = false;
  @Input() item: Notice;
  constructor(
    private http: HttpService,
    private _DomSanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog,
    private appService: AppService,
    private _snackbar: MatSnackBar
    ) { 
    this.getMyInfo();
  }

  getMyInfo() {
    this.spinnerActive = true;
    this.http.getMyInfo().subscribe(res => {
      // console.log(res);
      this.user = res;
      this.spinnerActive = false;
      this.notices = this.user.notices.filter(el => this.getActNotice(el));
      this.oldNotices = this.user.notices.filter(el => this.getOldNotice(el));
      // console.log(this.oldNotices);
      // console.log(this.notices);
    });
  }

  ngOnInit() {
  }

  showNotice(notice: Notice, router: Router) {
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['/../../user-panel/notice-board/', notice._id]);
    } else{
    this.router.navigate(['/../../main-page/notice-board/', notice._id]);
    }
  }

  editNotice(notice: Notice){
    this.router.navigate(['/../../user-panel/my-notices/edit/', notice._id]);
  }

  openDialog(notice: Notice){
    // console.log(notice);
    const message = `Czy na pewno chcesz usunąć to ogłosznie?`;

    const dialogData = new ConfirmDialogModel("", message);

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.http.deleteNotice(notice._id).subscribe(res => {
          // console.log(res);
          this.message = 'Twoje ogłoszenie zostało usunięte!';
          this.openSnackBar();
        }, err => {
          this.message = 'Coś poszło nie tak';
          this.openSnackBar();
        });
        this.notices = this.notices.filter(el=>el._id!==notice._id)
      }
    });
  }

  openActualiseDialog(notice: Notice){
    // console.log(notice);
    const message = `Czy na pewno chcesz odświeżyć swoje ogłoszenie?`;

    const dialogData = new ConfirmDialogModel('Możesz przedłużyć ważność swojego ogłoszenia o jeden miesiąc', message);

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.http.extendValidity(notice._id).subscribe(res => {
          //console.log(res);
        });
        this.oldNotices = this.oldNotices.filter(el=>el._id!==notice._id);
        this.notices.push(notice);
      }
    });
  }

  getOldNotice(notice: Notice){
    return this.appService.getOldNotice(notice);
  }

  getActNotice(notice: Notice){
    return this.appService.getActNotice(notice);
  }
  message = 'Ok';
  action = '';
  openSnackBar() {
    this._snackbar.open(this.message, this.action, {
      duration: 5000,
    });
  }

}
