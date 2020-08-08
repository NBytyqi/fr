import { SystemSettingsRoutes } from './system-settings.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingsPageComponent } from './system-settings-page.component';

@NgModule({
  imports: [
    CommonModule,
    SystemSettingsRoutes
  ],
  declarations: [SystemSettingsPageComponent]
})
export class SystemSettingsPageModule { }
