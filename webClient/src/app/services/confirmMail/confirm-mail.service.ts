
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelpers } from '../helpers/httpHelpers';
@Injectable({
  providedIn: 'root'
})
export class ConfirmMailService {

  constructor(private http: HttpClient) { }

  confirmMail(token: string) {
    return this.http.get(HttpHelpers.CONFIRM_MAIL_URL + "/" + token, {});
  }

}
