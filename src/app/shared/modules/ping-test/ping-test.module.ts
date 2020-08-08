import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PingTestRoutes } from './ping-test.routing';
import { PingTestComponent } from './components/ping-test/ping-test.component';

@NgModule({
  imports: [
    CommonModule,
    PingTestRoutes,
    FormsModule
  ],
  declarations: [PingTestComponent]
})
export class PingTestModule { }
