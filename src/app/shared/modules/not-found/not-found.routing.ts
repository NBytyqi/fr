import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found.component/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
];

export const NotFoundRoutes = RouterModule.forChild(routes);
