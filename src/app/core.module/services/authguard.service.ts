import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';


@Injectable({providedIn: 'root'})
export class AuthGuardService {

  constructor(
    private userApi: UserApi,
    private authService: AuthService,
    private router: Router,
    private logger: LoggerService
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let curUser;

    curUser = this.authService.user;


    if (curUser && curUser.SystemType) {
      this.logger.info(`This route requires authentication, but the user is not logged in. Redirecting to login page.`);
      this.router.navigate(['/auth/logout']);
      return false;
    }

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.logger.info(`This route requires authentication, but the user is not logged in. Redirecting to login page.`);
      this.router.navigate(['/auth/logout']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let curUser;
    curUser = this.authService.user;

    if (curUser && curUser.SystemType) {
      this.logger.info(`This route requires authentication, but the user is not logged in. Redirecting to login page.`);
      this.router.navigate(['/auth/logout']);
      return false;
    }

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.logger.info(`This route requires authentication, but the user is not logged in. Redirecting to login page.`);
      this.router.navigate(['/auth/logout']);
    }
  }

}
