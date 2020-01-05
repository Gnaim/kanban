import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../loginService/login.service';

@Injectable()
export class TokenGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (!this.loginService.getToken()) {
        this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }
}