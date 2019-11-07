import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  URL : string = "http://127.0.0.1:3000/signUp";
  httpContentType = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http : HttpClient) { }

  signup(user : User) : boolean {
      let isOk = false;
      let response : Observable<any>;
      this.http.post<User>(this.URL,user,this.httpContentType).subscribe(
        (res) => {
          console.log("res");
          console.log(res);
        },
        (err) => {
          console.log("err");
          console.log(err.error.text);
        });

        return isOk;
  }
}
