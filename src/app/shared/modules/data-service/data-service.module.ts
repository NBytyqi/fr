import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [

  ]
})
export class DataServiceModule {
  static forRoot(): ModuleWithProviders<DataServiceModule> {
    return {
      ngModule: DataServiceModule,
      providers: [
        DataService,
      ]
    };
  }

}
