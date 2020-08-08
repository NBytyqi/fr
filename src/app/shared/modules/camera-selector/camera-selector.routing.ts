import { CameraSelectorComponent } from './camera-selector.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CameraSelectorComponent,
  },
];

export const CameraSelectorRoutes = RouterModule.forChild(routes);
