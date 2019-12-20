import { Injectable } from '@angular/core';
import { User } from '../../entity/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/app/entity/response';


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

  
  failedExistingMail : string = '{"state" : 4}';
  success : string = '{"state" : 5}';
  failedServerError : string = '{"state" : 6}';

  constructor(private http : HttpClient) { }

  signup(user : User) : Response<Object> {
    /*  let isOk = false;
      let response : Observable<any>;
      this.http.post<any>(this.URL,user,this.httpContentType).subscribe(
        data => {
          console.log(data);
          console.log("res");
          console.log(data);
        },
        error => {
          console.log(error);
          console.log("err");
          console.log(error.error.text);
        });
        return isOk;
        */
      if(user){
        let res =  JSON.parse(this.success);
        let code = res.state;
        return new Response([],null,code);
      }else{
        let err = JSON.parse(this.failedServerError);
        let code = err.state; 
        return new Response([],code,null);
      }
  }
}
