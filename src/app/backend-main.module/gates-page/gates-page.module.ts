import { ButtonModule } from 'primeng/button';
import { FormGeneratorModule } from './../../shared/modules/form-generator/form-generator.module';
import { GateListComponent } from './gate-list/gate-list.component';
import { GateItemComponent } from './gate-item/gate-item.component';
import { GatesRoutes } from './gates-route.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatesPageComponent } from './gates-page.component';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    GatesRoutes,
    FormGeneratorModule,
    CardModule,
    ButtonModule
  ],
  declarations: [
    GatesPageComponent,
    GateItemComponent,
    GateListComponent
  ]
})
export class GatesPageModule { }
