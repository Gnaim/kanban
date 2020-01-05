import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../entity/User';
import { Observable } from 'rxjs';
import { HttpHelpers } from '../helpers/httpHelpers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  connect(user : User) {
    return this.http.post(HttpHelpers.LOGIN_URL,user,HttpHelpers.HTTP_OPTIONS);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getTokenExpirationTime(): string {
    return localStorage.getItem('expireIn');
  }

  public setTokenInfo(token: string,durationInHours : number) {
 //   let currentDate = new Date(new Date().getTime() + (durationInHours * 60 * 60 * 1000) ); //convert hours to milliseconds
 //   let expireIn : string = currentDate.toString();
 //   console.log("expireIn : " + expireIn);
    localStorage.setItem('token', token);
   // localStorage.setItem('expireIn', expireIn);
  }
/*
  public isTokenExpired(): boolean {
    let expirationDate = new Date(this.getTokenExpirationTime());
    let currentDate = new Date();
    return currentDate>expirationDate;
  }
*/
  public removeToken(){
    localStorage.removeItem('token');
  }
}
