import { GateTestDialogComponent } from './gate-test-dialog/gate-test-dialog.component';
import { FormGeneratorModule } from './../../shared/modules/form-generator/form-generator.module';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GateSettingsRoutes } from './gate-settings.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GateSettingsPageComponent } from './gate-settings-page.component';

@NgModule({
  imports: [
    CommonModule,
    GateSettingsRoutes,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    FormGeneratorModule
  ],
  declarations: [
    GateSettingsPageComponent,
    GateTestDialogComponent
  ]
})
export class GateSettingsPageModule { }
