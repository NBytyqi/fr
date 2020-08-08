import { FormGeneratorModule } from './../../shared/modules/form-generator/form-generator.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsersRoutes } from './users.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutes,
    ButtonModule,
    TableModule,
    FormGeneratorModule
  ],
  declarations: [UsersPageComponent]
})
export class UsersPageModule { }
