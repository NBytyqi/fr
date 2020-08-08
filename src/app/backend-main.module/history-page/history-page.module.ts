import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormGeneratorModule } from './../../shared/modules/form-generator/form-generator.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HistoryRoutes } from './history.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './history-page.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutes,
    CheckboxModule,
    TooltipModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    FormGeneratorModule,
    OverlayPanelModule,
    CalendarModule
  ],
  declarations: [HistoryPageComponent]
})
export class HistoryPageModule { }
