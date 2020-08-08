import { ValidationServiceModule } from './../validation-service/validation-service.module';
import { ControlMessagesRoutes } from './control-messages.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
  imports: [
    CommonModule,
    ControlMessagesRoutes,
    ValidationServiceModule
  ],
  declarations: [ControlMessagesComponent],
  exports: [ControlMessagesComponent]
})
export class ControlMessagesModule { }
