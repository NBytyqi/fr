import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordPageComponent } from './reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPageComponent
  },
];

export const ResetPasswordPageRoutes = RouterModule.forChild(routes);
