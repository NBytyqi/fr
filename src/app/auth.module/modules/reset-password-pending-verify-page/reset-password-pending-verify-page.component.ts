import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-reset-password-pending-verify-page',
  templateUrl: './reset-password-pending-verify-page.component.html',
  styleUrls: ['./reset-password-pending-verify-page.component.css']
})
export class ResetPasswordPendingVerifyPageComponent implements OnInit {

  public email: string = null;
  public globalApp = this.globalPropertiesService.appGlobal;

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.email = ((<any>this.activatedRoute.params).value).email;
    this.logger.info(`received parms: ${this.email}`);
    localStorage.setItem('resetEmail', this.email); // set email to be used later when the password is reset
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
