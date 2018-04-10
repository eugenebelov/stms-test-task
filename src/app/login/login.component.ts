import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../user/user.service";

@Component({
  selector: 'stms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  public errorMessage: string = "";
  loginForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
  })

  ngOnInit() {
  }

  onLogin() {
    this.user
        .login({
          'email': this.loginForm.controls.email.value,
          'password': this.loginForm.controls.password.value
        })
        .subscribe(
          (data) => { this.router.navigate(['/']) },
          (errorResponse) => { this.errorMessage = errorResponse.error.message; }
        );

    this.loginForm.reset({'password': ''});
  }

}
