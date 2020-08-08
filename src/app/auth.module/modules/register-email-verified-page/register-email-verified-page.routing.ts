import { RegisterEmailVerifiedPageComponent } from './register-email-verified-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegisterEmailVerifiedPageComponent
  },
];

export const RegisterEmailVerifiedPageRoutes = RouterModule.forChild(routes);
