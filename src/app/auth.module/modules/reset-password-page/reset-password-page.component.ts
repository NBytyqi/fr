import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../shared/modules/validation-service/validation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataURLS } from '../../../shared/base.url';
import { take } from 'rxjs/operators';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';


@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  public appGlobal = this.globalPropertiesService.appGlobal;
  public newPasswordForm: FormGroup;
  public tokenId: any;

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private userApi: UserApi,
    private router: Router,
    private logger: LoggerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((data: any) => {
      this.tokenId = data.access_token;
      this.logger.info(`Received access token=${this.tokenId}`);
    });


    this.newPasswordForm = this.fb.group({
      'password': [null, Validators.required],
      'password2': [null, Validators.required]
    }, { validator: ValidationService.passwordMatch });

  }

  async ResetPassword(formData: any) {
    this.toastrService.clear(); // clear any existing notifications

    const resetPayload = {
      newPassword: this.newPasswordForm.value['password'],
      access_token: this.tokenId
    };


    try {
      await this.userApi.setPassword(resetPayload);
      const resetEmail = localStorage.getItem('resetEmail');
      this.router.navigate([`/resetpasswordverified/${resetEmail}`]); // password was saved when the reset process was started
      this.logger.info(`User password was reset!`);
    } catch (error) {
      // tslint:disable-next-line:max-line-length
      this.toastrService.error(`We could not process your request. Reset link is only valid for 15min.`, 'Oops!', { positionClass: 'toast-top-full-width', timeOut: 5000 });
      this.logger.info(`There was an error processing your request ${error._body}`);
    }

  }

}
