import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http'
import { LoginService } from '../loginService/login.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {
  
  constructor(public loginService: LoginService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.loginService.getToken()}`,
                  'Content-Type' : 'application/json'
                }
              });
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse){
    if (error instanceof ErrorEvent){
      console.log("Client Side");
      console.log(error);
      return throwError(error);
    }else if(error instanceof HttpErrorResponse){
      console.log("Server Side");
      console.log(error);
      return throwError(error);
    } 
  }
}