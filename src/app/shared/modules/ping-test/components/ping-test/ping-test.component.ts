import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { GlobalPropertiesService } from '../../../global-properties/services/global-properties.service';

import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';

@Component({
  selector: 'app-ping-test',
  templateUrl: './ping-test.component.html',
  styleUrls: ['./ping-test.component.css'],
})
export class PingTestComponent implements OnInit {

  public data: any = {
    testRunning: false,
    workingon: ''
  };
  public results = new Array();
  public username = 'testclient';
  public password = 'testclient';
  public systemid = '';
  public schedule = {};


  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private logger: LoggerService,
    public userApi: UserApi,
    private authService: AuthService


  ) {
  }

  async ngOnInit() {

  }

  async StartTests() {
    if (!this.username || !this.password) {
      return;
    }

    try {
      this.results = new Array();
      this.data.testRunning = true;

      // first log out current user to do tests without auth
      if (this.authService.isAuthenticated()) {
        await this.authService.logout();
      }


    } catch (error) {
      this.logger.info(error.message);
    }

    this.data.testRunning = false;
  }

  async doSchedule() {

    let timesTotal = 0;
    this.data.timestart = new Date().getTime();
    this.data.count = 0;
    while (this.data.count < 1000) {
      this.data.count += 1;
      const start = new Date().getTime();
      const end = new Date().getTime();
      this.data.speed = end - start;
      this.data.time = (new Date().getTime() - this.data.timestart);
      timesTotal += this.data.speed;
      const avg = timesTotal / this.data.count;
      this.data.avgtime = avg.toPrecision(2);
    }


  }



}
