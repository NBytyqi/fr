
import { SelectButtonModule } from 'primeng/selectbutton';

import { SortablejsModule } from 'angular-sortablejs';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../../core.module/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InplaceModule } from 'primeng/inplace';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    RadioButtonModule,
    SpinnerModule,
    TooltipModule,
    NgPipesModule,
    MomentModule,
    InplaceModule,
    RouterModule,
    SortablejsModule.forRoot({}),
    MultiSelectModule,
    AccordionModule,
    SelectButtonModule,
    TreeTableModule
  ],
  declarations: [

  ],
  exports: [
    SortablejsModule,
    AccordionModule,
    SpinnerModule
  ],
  entryComponents: [  ]
})
export class SharedModule { }
