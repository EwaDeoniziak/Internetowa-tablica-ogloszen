import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/shared/api-models';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  user: User;

  constructor(private router: Router, private http: HttpService) {
    this.http.getMyInfo().subscribe(res => {
      this.user = res; 
      // console.log(res);
    });
   }

  ngOnInit() {
  }

  myNoticesNavigate(){
    this.router.navigate(['/../../user-panel/my-notices']);
  }

}
