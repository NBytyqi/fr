import { MyAccountPageComponent } from './my-account-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyAccountPageComponent,
  },
];

export const MyAccountRoutes = RouterModule.forChild(routes);
