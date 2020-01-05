import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelpers } from '../helpers/httpHelpers';

@Injectable({
    providedIn: 'root'
  })
  export class ForgetPasswordService {
  
    constructor(private http: HttpClient) { }
  
    sendUserMail(userEmail : string) {
      return this.http.post(HttpHelpers.FORGET_PASSWORD_URL,{email : userEmail},HttpHelpers.HTTP_OPTIONS);
    }
}