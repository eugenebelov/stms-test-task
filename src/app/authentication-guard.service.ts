import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from "./login/login.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private login: LoginService) {}

  canActivate(): boolean {
    console.log("Auth Guard", this.login.loggedIn());

    if(this.login.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
