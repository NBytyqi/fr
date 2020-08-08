import { UsersPageComponent } from './users-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
  },
];

export const UsersRoutes = RouterModule.forChild(routes);
