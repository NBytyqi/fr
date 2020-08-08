import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormGeneratorModule } from './../../shared/modules/form-generator/form-generator.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BlacklistRoutes } from './blacklist.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlacklistPageComponent } from './blacklist-page.component';


@NgModule({
  imports: [
    CommonModule,
    BlacklistRoutes,
    DialogModule,
    FormsModule,
    FormGeneratorModule,
    ButtonModule,
    TableModule
  ],
  declarations: [BlacklistPageComponent]
})
export class BlacklistPageModule { }
