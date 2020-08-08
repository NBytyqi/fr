import { Routes, RouterModule } from '@angular/router';
import { RegisterPendingVerifyPageComponent } from './register-pending-verify-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPendingVerifyPageComponent
  },
];

export const RegisterPendingVerifyPageRoutes = RouterModule.forChild(routes);
