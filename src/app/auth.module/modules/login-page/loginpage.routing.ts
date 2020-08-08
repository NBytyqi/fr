import { LoginPageComponent } from './login-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
];

export const LoginpageRoutes = RouterModule.forChild(routes);
