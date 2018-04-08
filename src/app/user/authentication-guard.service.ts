import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from "./user.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private user: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log("Auth Guard", this.user.loggedIn());

    if(this.user.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
