import { OffClickDirective } from './directives/app-offClick.directive';
import { DialogModule } from 'primeng/dialog';
import { BytesPipeModule } from './../shared/modules/bytes-pipe/bytes-pipe.module';
import { DynamicComponentDirective } from './directives/dynamic-component-container.directive';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { FullscreenModule } from './modules/fullscreen.module/fullscreen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/authguard.service';
import { AppFullheightDirective } from './directives/app-fullheight.directive';
import { WindowRef } from './services/window-ref.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToDirective } from './directives/count-to.directive';
import { AppItemAppearDirective } from './directives/app-item-appear.directive';
import { SafePipe } from './pipes/safe.pipe';
import { LetterIconComponent } from './components/letter-icon/letter-icon.component';

import { HHMMSSPipe } from './pipes/hhmmss.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullscreenModule,
    // ToastrModule,
    // ToastContainerModule,
    ConfirmDialogModule,
    DialogModule,
    BytesPipeModule
  ],
  declarations: [
    CountToDirective,
    AppItemAppearDirective,
    SafePipe,
    HHMMSSPipe,
    AppFullheightDirective,
    LetterIconComponent,
    NotificationIconComponent,
    DynamicComponentDirective,
    OffClickDirective


  ],
  providers: [],
  exports: [
    CountToDirective,
    DynamicComponentDirective,
    AppItemAppearDirective,
    SafePipe,
    HHMMSSPipe,
    AppFullheightDirective,
    LetterIconComponent,
    FullscreenModule,
    NotificationIconComponent,
    ConfirmDialogModule,
    DialogModule,
    // ToastrModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        WindowRef,
        AuthGuardService,
        ConfirmationService
        // ToastrService
      ]
    };
  }

}
