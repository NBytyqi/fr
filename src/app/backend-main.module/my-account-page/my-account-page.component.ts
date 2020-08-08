import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.css']
})
export class MyAccountPageComponent implements OnInit {

  newPassword;
  authService;

  constructor(public userApi: UserApi) {
    this.authService = this.userApi.authService;
  }

  ngOnInit() {
  }

  async changePassword(pass) {

  }

}
