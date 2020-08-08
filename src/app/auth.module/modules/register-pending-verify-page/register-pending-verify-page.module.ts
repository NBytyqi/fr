import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPendingVerifyPageComponent } from './register-pending-verify-page.component';
import { RegisterPendingVerifyPageRoutes } from './register-pending-verify-page.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterPendingVerifyPageRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPendingVerifyPageComponent]
})
export class RegisterPendingVerifyPageModule { }
