import { FullscreenService } from './fullscreen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenDirective } from './fullscreen.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FullscreenDirective
  ], providers: [
    FullscreenService
  ], exports: [
    FullscreenDirective
  ]
})
export class FullscreenModule { }
