import { ControlMessagesModule } from './../../../shared/modules/control-messages/control-messages.module';
import { IconInputModule } from './../../../shared/modules/icon-input/icon-input.module';
import { ForgotpasswordpageRoutes } from './forgotpasswordpage.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ForgotpasswordpageRoutes,
    IconInputModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ToastrModule,
    ToastContainerModule,
  ],
  declarations: [ForgotPasswordPageComponent]
})
export class ForgotPasswordPageModule { }
