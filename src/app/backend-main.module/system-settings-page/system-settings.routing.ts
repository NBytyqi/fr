import { SystemSettingsPageComponent } from './system-settings-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsPageComponent,
  },
];

export const SystemSettingsRoutes = RouterModule.forChild(routes);
