import { AuthGuardService } from './../core.module/services/authguard.service';
import { TesterComponent } from './components/tester/tester.component';
import { BackendMainComponent } from './backend-main.component';
import { RouterModule, Routes } from '@angular/router';

// got here via /main
const routes: Routes = [
  {
    path: '',
    component: BackendMainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'gates',
        pathMatch: 'full'
      }
      // , {
      //   path: 'tester',
      //   component: TesterComponent,
      // }
      , {
        path: 'gates',
        loadChildren: () => import('./gates-page/gates-page.module').then(m => m.GatesPageModule) // LAZY
      }, {
        path: 'history',
        loadChildren: () => import('./history-page/history-page.module').then(m => m.HistoryPageModule) // LAZY
      }, {
        path: 'users',
        loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule) // LAZY
      }, {
        path: 'camerasettings',
        loadChildren: () => import('./camera-settings-page/camera-settings-page.module').then(m => m.CameraSettingsPageModule) // LAZY
      }, {
        path: 'gatesettings',
        loadChildren: () => import('./gate-settings-page/gate-settings-page.module').then(m => m.GateSettingsPageModule) // LAZY
      }, {
        path: 'systemsettings',
        loadChildren: () => import('./system-settings-page/system-settings-page.module').then(m => m.SystemSettingsPageModule) // LAZY
      }, {
        path: 'myaccount',
        loadChildren: () => import('./my-account-page/my-account-page.module').then(m => m.MyAccountPageModule) // LAZY
      }, {
        path: 'blacklist',
        loadChildren: () => import('./blacklist-page/blacklist-page.module').then(m => m.BlacklistPageModule) // LAZY
      }
    ]
  }

];
export const BackendMainRoutingModule = RouterModule.forChild(routes);
