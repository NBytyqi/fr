import { CustomBarComponent } from './bar.component';
import { CustomProgressDirective } from './progress.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomProgressBarComponent,
    CustomProgressDirective,
    CustomBarComponent
  ],
  exports: [CustomProgressBarComponent]
})
export class CustomProgressBarModule { }
