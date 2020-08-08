import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'
  ]
})
export class ForgotPasswordPageComponent implements OnInit {
  public app = this.globalPropertiesService.appGlobal;
  public passwordResetForm: FormGroup;

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private userApi: UserApi,
    private router: Router,
    private logger: LoggerService,
    private fb: FormBuilder,
    private toastrService: ToastrService) {

    this.passwordResetForm = fb.group({
      email: [null, Validators.email]
    });
  }

  ngOnInit() {

  }

  async RequestPasswordReset(formData: any) {
    this.toastrService.clear();

    try {
      const msg = await this.userApi.resetPassword(formData);
      this.router.navigate([`/resetpendingverify/${formData.email}`]);
    } catch (err) {
      this.toastrService.error('We could not process your request, check your email and try again', 'Oops!', { positionClass: 'toast-top-full-width', timeOut: 5000 });
      this.logger.error(err.message);
    }


  }

}
