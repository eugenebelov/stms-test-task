import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../user/user.service";

@Component({
  selector: 'stms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    this.user
        .login({
          email: 'jim@mail.com',
          password: '123'
        })
        .subscribe((data) => {
          console.log("LOGIN COMP", data);
          this.router.navigate(['/']);
        });

  }

}
