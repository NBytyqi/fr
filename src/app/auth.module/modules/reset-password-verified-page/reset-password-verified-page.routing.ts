import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordVerifiedPageComponent } from './reset-password-verified-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordVerifiedPageComponent
  },
];

export const ResetPasswordVerifiedPageRoutes = RouterModule.forChild(routes);
