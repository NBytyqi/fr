import { NotFoundRoutes } from './not-found.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found.component/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutes
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
