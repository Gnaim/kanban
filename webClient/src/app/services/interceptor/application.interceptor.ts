import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http'
import { LoginService } from '../loginService/login.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHelpers } from '../helpers/httpHelpers';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {
  
  constructor(public loginService: LoginService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(!request.url.includes(HttpHelpers.LOGIN_URL) && !request.url.includes(HttpHelpers.LOGIN_URL)){
      console.log("Request sent : ");
      console.log(request);
      request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.loginService.getToken()}`,
                    'Content-Type' : 'application/json'
                  }
                });
    }
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse){
    if (error instanceof ErrorEvent){
      console.log("========== Client Side ==========");
      console.log(error);
      return throwError(error);
    }else if(error instanceof HttpErrorResponse){
      console.log("========== Server Side ==========");
      console.log(error);
      return throwError(error);
    } 
  }
}