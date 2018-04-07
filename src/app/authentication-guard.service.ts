import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log("Auth Guard");
    this.router.navigate(['/login']);

    return false;
  }

}
