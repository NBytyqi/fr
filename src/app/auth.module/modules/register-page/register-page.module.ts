import { ControlMessagesModule } from './../../../shared/modules/control-messages/control-messages.module';
import { IconInputModule } from './../../../shared/modules/icon-input/icon-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { RegisterPageRoutes } from './register-page.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterPageRoutes,
    IconInputModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesModule
  ],
  declarations: [RegisterPageComponent]
})
export class RegisterPageModule { }
