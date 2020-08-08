import { GatesPageComponent } from './gates-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: GatesPageComponent,
  },
];

export const GatesRoutes = RouterModule.forChild(routes);
