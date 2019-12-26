import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../loginService/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (this.loginService.getToken() && !this.loginService.isTokenExpired()) {
        this.router.navigate(['/Home/Projects']);
      return false;
    }
    return true;
  }
}