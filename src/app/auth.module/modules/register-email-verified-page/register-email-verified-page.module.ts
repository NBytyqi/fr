import { RegisterEmailVerifiedPageRoutes } from './register-email-verified-page.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterEmailVerifiedPageComponent } from './register-email-verified-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterEmailVerifiedPageRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterEmailVerifiedPageComponent]
})
export class RegisterEmailVerifiedPageModule { }
