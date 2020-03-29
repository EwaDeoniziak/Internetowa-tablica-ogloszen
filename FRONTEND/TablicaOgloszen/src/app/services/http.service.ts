import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice, User, Category } from '../shared/api-models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }
  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.httpUrl + 'notices');
  }
  getOneNotice(id: string): Observable<Notice> {
    return this.http.get<Notice>(this.httpUrl + 'notices/' + id);
  }

  getMyInfo() {
      let headers = new HttpHeaders();
      let token = localStorage.getItem('token');
      headers = headers.append('token', token)
      return this.http.get<User>(this.httpUrl + 'users/logged-user-information',{headers});
  }
  addNotice(formData) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('token', token);
    return this.http.post(this.httpUrl + 'notices', formData, { headers, reportProgress: true, observe: 'events'});
  }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.httpUrl + 'categories');
  }
  updateNotice(id: string, formData){
    let headers = new HttpHeaders();
      let token = localStorage.getItem('token');
      headers = headers.append('token', token)
    return this.http.put<Notice>(this.httpUrl + 'notices/' + id, formData, {headers});
  }
  deleteNotice(id: string){
    let headers = new HttpHeaders();
      let token = localStorage.getItem('token');
      headers = headers.append('token', token)
    return this.http.delete<Notice>(this.httpUrl + 'notices/' + id, {headers});
  }
  extendValidity(id: string){
    let headers = new HttpHeaders();
      let token = localStorage.getItem('token');
      headers = headers.append('token', token);
      return this.http.put<Notice>(this.httpUrl + 'notices/extendValidity/' + id, {}, {headers});
  }
}
