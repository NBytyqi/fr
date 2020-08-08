import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ToastContainerModule,
    HttpClientModule,
    ToastrModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [],
  providers: [

  ]

})
export class AuthModule {




}
