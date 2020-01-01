import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../entity/Project';
import { HttpHelpers } from '../helpers/httpHelpers';
import { User } from 'src/app/entity/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(HttpHelpers.USER_URL, HttpHelpers.HTTP_OPTIONS);
  }

  updateProfile(user: User) {
    return this.http.put(HttpHelpers.USER_URL,user,{ observe: "response" });
  }
}