import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@stms-app/user/user.service';

class UserModel {
  name: string = "";
  avatar: string = "";

  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }
}

@Component({
  selector: 'stms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  userModel: UserModel;

  ngOnInit() {
    this.userModel = new UserModel('', '');
    this.user
        .getUserDetails()
        .subscribe((user) => {
          const {name, avatar} = user;

          this.userModel.name = name;
          this.userModel.avatar = avatar;
        });
  }

  onLogout() {
    this.user.logout();
    this.router.navigate(['login']);
  }

}
