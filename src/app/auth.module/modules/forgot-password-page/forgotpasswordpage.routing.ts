import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPageComponent
  },
];

export const ForgotpasswordpageRoutes = RouterModule.forChild(routes);
