import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordPendingVerifyPageComponent } from './reset-password-pending-verify-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPendingVerifyPageComponent
  },
];

export const ResetPasswordPendingVerifyPageRoutes = RouterModule.forChild(routes);
