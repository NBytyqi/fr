import { BlacklistPageComponent } from './blacklist-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlacklistPageComponent,
  },
];

export const BlacklistRoutes = RouterModule.forChild(routes);
