import { BytesPipe } from './bytes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BytesPipe],
  exports: [BytesPipe]
})
export class BytesPipeModule { }
