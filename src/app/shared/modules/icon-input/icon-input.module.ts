import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconInputComponent } from './components/icon-input.component/icon-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IconInputComponent],
  exports: [IconInputComponent]
})
export class IconInputModule { }
