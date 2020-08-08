import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlsPlayerComponent } from './hls-player.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [HlsPlayerComponent],
  exports: [HlsPlayerComponent]
})
export class HlsPlayerModule { }
