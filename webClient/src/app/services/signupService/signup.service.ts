import { Injectable } from '@angular/core';
import { User } from '../../entity/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/app/entity/response';
import { HttpHelpers } from '../helpers/httpHelpers';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  constructor(private http : HttpClient) { }

  signup(user : User) {
      return this.http.post(HttpHelpers.SIGN_UP_URL,user,HttpHelpers.HTTP_OPTIONS);
  }
}
