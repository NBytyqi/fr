import { UserApi } from 'app/shared/modules/data-service/UserApi.service';

import { ValidationService } from '../../../shared/modules/validation-service/validation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public app = this.globalPropertiesService.appGlobal;
  public registerForm: FormGroup;

  // get some static methods, convert to local methods (becuases views can only access instance members)
  public isInvalid = ValidationService.isInvalid;
  public isValid = ValidationService.isValid;

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private router: Router,
    public userApi: UserApi,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    const start: any = this.activatedRoute.queryParams;

    this.registerForm = this.fb.group({
      'email': [start.value.email, Validators.compose([Validators.required, ValidationService.emailValidator])],
      'invitationcode': [start.value.invitationcode, Validators.required],
      'firstname': [start.value.firstname, Validators.required],
      'lastname': [start.value.lastname, Validators.required],
      'company': [start.value.company, Validators.required],
      'password': [start.value.password, Validators.required],
      'password2': [start.value.password2, Validators.required],
      'agree': [start.value.agree, Validators.requiredTrue]
    }, { validator: ValidationService.passwordMatch });

  }


  async register(formData: any) {
    await this.userApi.register(formData);
    this.router.navigate(['/registerpendingverify', formData.firstname, formData.email]);
  }


}
