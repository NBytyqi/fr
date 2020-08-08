import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedModule } from './shared/modules/shared.module/shared.module'; // should not need this now
import { CustomErrorHandler } from './custom-error-handler';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorHandler } from '@angular/core';

import { GlobalPropertiesModule } from './shared/modules/global-properties/global-properties.module';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { ApiAuthLoaderModule } from './shared/modules/api-auth-loader/api-auth-loader.module';
import { DataServiceModule } from './shared/modules/data-service/data-service.module';
import { HttpClientModule } from '@angular/common/http';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GlobalPropertiesModule.forRoot(),
    ApiAuthLoaderModule, // just loads the auth and base storage providers. Other api models need provided in the module where they are used
    DataServiceModule.forRoot(),
    BrowserAnimationsModule, // used by primeNG
    // SDKBrowserModule.forRoot(), // loopback sdk (don't use this, because it imports EVERYTHING. Instead use providers for what you need in modules)
    BrowserModule,
    AppRoutingModule, // main routes defined in here
    ToastrModule.forRoot(), // used on login page
    ToastContainerModule, // used on login page,
      HttpClientModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler } // error handler, silences errors in prod mode
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



