import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MyAccountRoutes } from './my-account.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountPageComponent } from './my-account-page.component';

@NgModule({
  imports: [
    CommonModule,
    MyAccountRoutes,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  declarations: [MyAccountPageComponent]
})
export class MyAccountPageModule { }
