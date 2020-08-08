import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent
  },
];

export const RegisterPageRoutes = RouterModule.forChild(routes);
