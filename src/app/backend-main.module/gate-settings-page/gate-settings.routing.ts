import { GateSettingsPageComponent } from './gate-settings-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GateSettingsPageComponent,
  },
];

export const GateSettingsRoutes = RouterModule.forChild(routes);
