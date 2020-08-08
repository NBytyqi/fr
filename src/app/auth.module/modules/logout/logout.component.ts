import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { DataService } from '../../../shared/modules/data-service/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userApi: UserApi,
    private authService: AuthService,
    private router: Router,
    private logger: LoggerService,
    private dataService: DataService
  ) {

  }

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {

      try {
        const err = await this.authService.logout();

        this.dataService.setCurrentUser();
        this.logger.info('User logged out!');
        this.router.navigate(['/']);

      } catch (error) {
        this.logger.error('Could not logout user', error);
        this.router.navigate(['/']);
      }

    } else {
      this.router.navigate(['/auth/login']);
    }

  }

}
