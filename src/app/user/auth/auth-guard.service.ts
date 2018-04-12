import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { tap } from 'rxjs/operators';

import { UserService } from "../user.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private user: UserService) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.user
                  .loggedIn()
                  .pipe(
                    tap(
                      (isLoggedIn) => {
                        if(!isLoggedIn) this.router.navigate(['/login']);
                      }
                    )
                  );
  }

}
