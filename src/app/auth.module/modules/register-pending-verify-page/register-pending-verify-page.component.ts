import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-register-pending-verify-page',
  templateUrl: './register-pending-verify-page.component.html',
  styleUrls: ['./register-pending-verify-page.component.css']
})
export class RegisterPendingVerifyPageComponent implements OnInit {

  public email: string = null;
  public name: string = null;
  public globalApp = this.globalPropertiesService.appGlobal;

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    const params = ((<any>this.activatedRoute.params).value);
    this.email = params.email;
    this.name = params.name;
    this.logger.info(`Register pending verify page, received parms: ${params}`);
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
