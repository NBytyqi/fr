import { ControlMessagesModule } from './../../../shared/modules/control-messages/control-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconInputModule } from './../../../shared/modules/icon-input/icon-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { ResetPasswordPageRoutes } from './reset-password-page.routing';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordPageRoutes,
    IconInputModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ToastrModule,
    ToastContainerModule,
  ],
  declarations: [ResetPasswordPageComponent]
})
export class ResetPasswordPageModule { }
