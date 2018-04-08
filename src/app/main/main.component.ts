import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Component({
  selector: 'stms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onLogout() {
    this.user.logout();
    console.log("LOGOUT", this.user.loggedIn());
    this.router.navigate(['login']);
  }

}
