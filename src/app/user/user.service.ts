import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  private isLoggedIn:boolean = false;

  login() {
    // here will be an http request
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

}
