import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordPendingVerifyPageComponent } from './reset-password-pending-verify-page.component';
import { ResetPasswordPendingVerifyPageRoutes } from './reset-password-pending-verify-page.routing';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordPendingVerifyPageRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordPendingVerifyPageComponent]
})
export class ResetPasswordPendingVerifyPageModule { }
