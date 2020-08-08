import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPropertiesService } from './services/global-properties.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class GlobalPropertiesModule {
  static forRoot(): ModuleWithProviders<GlobalPropertiesModule> {
    return {
      ngModule: GlobalPropertiesModule,
      providers: [
        GlobalPropertiesService,
      ]
    };
  }

}
