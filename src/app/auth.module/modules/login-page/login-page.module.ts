import { IconInputModule } from './../../../shared/modules/icon-input/icon-input.module';
import { LoginpageRoutes } from './loginpage.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    LoginpageRoutes,
    IconInputModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ToastrModule,
    ToastContainerModule,
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule { }
