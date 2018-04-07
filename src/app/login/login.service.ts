import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

  private isLoggedIn:boolean = false;

  login() {
    // here will be an http request
    this.isLoggedIn = true;
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

}
