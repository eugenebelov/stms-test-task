import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private isLoggedIn:boolean = false;
  private baseUrl: string = 'http://localhost:3000';
  private token: string;
  private uid: number;

  public getToken() {
    return (this.hasSession()) ? JSON.parse(window.localStorage.getItem('user')) : "";
  }

  login(credentials) {
    // here will be an http request
    const {email, password} = credentials;

    return this.http
      .post(`${this.baseUrl}/login`, {email, password})
      .pipe(
        tap(
          response => {
            console.log(response);

            window.localStorage.setItem('user', JSON.stringify({
              'token': response['access_token'],
              'uid': response['uid']
            }));

            this.isLoggedIn = true;
            this.token = response['access_token'];
            this.uid = response['uid'];
          }
        )
      )
  }

  logout() {
    this.isLoggedIn = false;
    window.localStorage.setItem('user', '');
  }

  hasSession(): boolean {
    const authkey = window.localStorage.getItem('user');

    if(authkey === null) return false;

    const authkeyData = JSON.parse(authkey);

    this.isLoggedIn = true;
    this.token = authkeyData.access_token;
    this.uid = authkeyData.uid;
    return (authkeyData && authkeyData.token) ? true : false;
  }

  loggedIn(): Observable<boolean> {
    return Observable.of(this.hasSession());
  }

  public getUserDetails(): any {
    return this.http.get(`${this.baseUrl}/users/${this.uid}`);
  }

  public getUserItemPositions(): any {
    return this.http.get(`${this.baseUrl}/users/${this.uid}/positions`);
  }

  public saveUserItemPositions(pid, x, y): any {
    return this.http.patch(`${this.baseUrl}/positions/${pid}`, {
      'position': {
        'x': x,
        'y': y
      }
    });
  }
}
