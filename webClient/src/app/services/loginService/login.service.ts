import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../entity/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  CONNECTION_URL = "http://127.0.0.1:3000/login";
  fail: boolean = true;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  connect(email: string, password: string): boolean {

    let response: Observable<any> = this.http.post<User>(this.CONNECTION_URL, new User(email, password), this.httpOptions);
    response.subscribe((response: Object) => {
      if (response['token'] != null) {
        this.setToken(response['token']);
        console.log('token' + response['token']);
        this.fail = false;
      } else {
        this.fail = true;
      }

    }, (err) => { this.fail = true; }, () => { });
    console.log(!this.fail);
    return !this.fail;

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

}
