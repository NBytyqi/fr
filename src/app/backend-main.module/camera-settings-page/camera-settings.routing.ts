import { CameraSettingsPageComponent } from './camera-settings-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CameraSettingsPageComponent,
  },
];

export const CameraSettingsRoutes = RouterModule.forChild(routes);
