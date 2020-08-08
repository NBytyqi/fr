import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconInputModule } from './../shared/modules/icon-input/icon-input.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from './../shared/modules/shared.module/shared.module';
import { BreadcrumbToolbarComponent } from './components/breadcrumb-toolbar/breadcrumb-toolbar.component';
import { UserOptionsComponent } from './components/left-sidebar/user-options/user-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { SidebarNavComponent } from './components/left-sidebar/sidebar-nav/sidebar-nav.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { SearchFormComponent } from './components/left-sidebar/search-form/search-form.component';
import { HorizontalMenuComponent } from './components/horizontal-menu/horizontal-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomProgressBarModule } from '../shared/modules/progress-bar.module/progress-bar.module';
import { SalesCtrlComponent } from './components/sales-ctrl/sales-ctrl.component';
import { CoreModule } from '../core.module/core.module';
import { AppProtectedDirective } from './../core.module/directives/app-Protected.directive';
import { BackendMainRoutingModule } from './backend-main.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataViewModule} from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';

// inernal sections to this module
import { TesterComponent } from './components/tester/tester.component';
import { BackendMainComponent } from './backend-main.component';
import { LaddaModule } from 'angular2-ladda';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'ngx-moment';
import { TableModule } from 'primeng/table';
import { AnimatorModule } from 'css-animator';
import { ListboxModule} from 'primeng/listbox';
import { SelectButtonModule} from 'primeng/selectbutton';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerModule } from 'primeng/spinner';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StepsModule } from 'primeng/steps';
import {InplaceModule} from 'primeng/inplace';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ContextMenuModule} from 'primeng/contextmenu';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabViewModule,
    BackendMainRoutingModule,
    LaddaModule,
    CustomProgressBarModule,
    FormsModule,
    UiSwitchModule,
    NgPipesModule,
    MomentModule,
    InputSwitchModule,
    DropdownModule,
    SpinnerModule,
    MessagesModule,
    InplaceModule,
    CheckboxModule,
    CalendarModule,
    RadioButtonModule,
    SharedModule,
    TableModule,
    AnimatorModule,
    ListboxModule,
    DataViewModule,
    PanelModule,
    SelectButtonModule,
    MultiSelectModule,
    OverlayPanelModule,
    ContextMenuModule,
    StepsModule,
    IconInputModule,
    // this is actually a page to be routed to with everything in one module
    ToastContainerModule,
    ToastrModule,
    PerfectScrollbarModule,
    ConfirmDialogModule
  ],
  declarations: [
    SalesCtrlComponent,
    TesterComponent,
    BackendMainComponent,
    AppProtectedDirective,
    FooterComponent,
    HorizontalMenuComponent,
    SearchFormComponent,
    LeftSidebarComponent,
    SearchFormComponent,
    SidebarNavComponent,
    TopNavbarComponent,
    UserOptionsComponent,
    BreadcrumbToolbarComponent,
  ],
  providers: [

  ],
  exports: [

  ]
})
export class BackendMainModule { }

