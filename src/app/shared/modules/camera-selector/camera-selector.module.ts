import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HlsPlayerModule } from './../hls-player/hls-player.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { OnvifScannerComponent } from './onvif-scanner/onvif-scanner.component';
import { CameraSelectorRoutes } from './camera-selector.routing';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraSelectorComponent } from './camera-selector.component';
import { FormGeneratorModule } from '../form-generator/form-generator.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    CameraSelectorRoutes,
    ListboxModule,
    DialogModule,
    FormsModule,
    HlsPlayerModule,
    FormGeneratorModule,
    OverlayPanelModule
  ],
  declarations: [
    CameraSelectorComponent,
    OnvifScannerComponent
  ],
  exports: [
    CameraSelectorComponent,
    OnvifScannerComponent
  ]
})
export class CameraSelectorModule { }
