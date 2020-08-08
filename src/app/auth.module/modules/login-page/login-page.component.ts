import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { ValidationService } from '../../../shared/modules/validation-service/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'app/shared/modules/data-service/services/data.service';
import { AuthService } from 'app/shared/modules/data-service/auth.service';



@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [], // make fade in animation available to this component
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  public appGlobal = this.globalPropertiesService.appGlobal;
  public isInvalid = ValidationService.isInvalid;
  public isValid = ValidationService.isValid;
  public email: string = null;
  public isLoggingIn: boolean;
  public isLoadingBackend: boolean;
  public loginButtonDesc = 'Login';

  constructor(
    private globalPropertiesService: GlobalPropertiesService,
    private userApi: UserApi,
    private router: Router,
    private toastrService: ToastrService,
    private logger: LoggerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService
  ) {


    if (this.authService.isAuthenticated()) {
      this.isLoadingBackend = true;
      this.loginButtonDesc = 'Logging In...';
      this.router.navigate(['/main']);
      return;
    }
  }

  ngOnInit() {
    this.email = ((<any>this.activatedRoute.params).value).username;
    if (this.email) {
      this.logger.info(`Received username param: ${this.email}`);
    }

    this.loginForm = this.fb.group({
      'username': [this.email, Validators.required],
      'password': [null, Validators.required],
      'rememberme': [!!this.authService.getToken()]
    });


  }


  async login(formData: any) {
    if (!formData.username || !formData.password) {
      this.logger.info('Missing username or password!');

      this.toastrService.clear();
      this.toastrService.error('Missing username or password', 'Oops!', { positionClass: 'toast-top-full-width', timeOut: 5000 });
      return;
    }

    this.isLoggingIn = true;

    const credentials = {
      password: formData.password,
      email: formData.username
    };

    this.loginButtonDesc = 'Logging in';

    try {
      const result = await this.authService.login(credentials.email, credentials.password).toPromise();
      this.authService.setUser(result.user);
      this.authService.setToken(result.token, formData.rememberme);

      // resetablish realtime data connection, with new login
      this.dataService.disconnectRealtime();
      this.dataService.connectRealtime();

      this.isLoadingBackend = true;
      this.loginButtonDesc = 'Logging in...';
      this.toastrService.clear();
      this.logger.info(`Login success!`);

      this.router.navigate(['/main']);
    } catch (err) {
      this.toastrService.clear();
      this.toastrService.error(err.message, err.message ? err.message : err, { positionClass: 'toast-top-full-width', timeOut: 5000 });
      this.logger.error(`ERROR Logging in: ${err.message ? err.message : err}`);
      this.isLoggingIn = false;
      this.isLoadingBackend = false;
      this.loginButtonDesc = 'Login';
    }


  }

}
