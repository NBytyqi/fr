import { ResetPasswordPendingVerifyPageRoutes } from './../reset-password-pending-verify-page/reset-password-pending-verify-page.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordVerifiedPageComponent } from './reset-password-verified-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordPendingVerifyPageRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordVerifiedPageComponent]
})
export class ResetPasswordVerifiedPageModule { }
