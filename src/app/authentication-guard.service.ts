import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from "./login/login.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private login: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log("Auth Guard", this.login.loggedIn());

    if(this.login.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
