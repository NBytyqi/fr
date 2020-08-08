import { ActivatedRoute, Router } from '@angular/router';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-reset-password-verified-page',
  templateUrl: './reset-password-verified-page.component.html',
  styleUrls: ['./reset-password-verified-page.component.css']
})
export class ResetPasswordVerifiedPageComponent implements OnInit {

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
  }

  goToLogin() {
    this.router.navigate([`/login/${this.email}`]);
  }

}
