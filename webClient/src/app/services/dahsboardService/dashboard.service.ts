import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project } from '../../entity/Project';
import { HttpHelpers } from '../helpers/httpHelpers';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly limitDashboard: any = 3;
  constructor(private http: HttpClient) { }

  getDashboard() {
    let requestParams = new HttpParams();
    requestParams.set("limit", "5");
    return this.http.get(HttpHelpers.DASHBOARD_URL,{ observe: "response", params : requestParams });
  }

}