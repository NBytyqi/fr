import { CameraSelectorModule } from './../../shared/modules/camera-selector/camera-selector.module';
import { CameraSettingsRoutes } from './camera-settings.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraSettingsPageComponent } from './camera-settings-page.component';

@NgModule({
  imports: [
    CommonModule,
    CameraSettingsRoutes,
    CameraSelectorModule
  ],
  declarations: [CameraSettingsPageComponent]
})
export class CameraSettingsPageModule { }
