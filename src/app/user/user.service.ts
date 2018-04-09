import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private isLoggedIn:boolean = false;
  private loginUrl: string = 'http://localhost:3000/login';
  private token: string;

  login(credentials) {
    // here will be an http request
    const {email, password} = credentials;

    return this.http
      .post(this.loginUrl, {email, password})
      .pipe(
        tap(
          response => {
            this.isLoggedIn = true;
            this.token = response['access_token'];

            console.log("LOGIN SERV", this.token);
          }
        )
      )
  }

  logout() {
    this.isLoggedIn = false;
  }

  loggedIn(): Observable<boolean> {
    return Observable.of(this.isLoggedIn);
  }

}
