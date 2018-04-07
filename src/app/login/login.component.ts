import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";

@Component({
  selector: 'stms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private login:LoginService) { }

  ngOnInit() {
  }

  onLogin() {
    this.login.login();
    console.log("LOGIN", this.login.loggedIn());

    this.router.navigate(['/']);
  }

}
