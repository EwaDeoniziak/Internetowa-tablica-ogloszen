import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginUser, RegisterUser } from '../shared/api-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  httpUrl = 'http://localhost:3000/api/';

  loginUser(user: LoginUser) {
    return this.http.post(this.httpUrl + 'user/login', user, {responseType: 'text'})
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../../main-page/auth']);
  }

  registerUser(user: RegisterUser) {
    return this.http.post(this.httpUrl + 'user/register', user);
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }
}
