import { Routes, RouterModule } from '@angular/router';
import { PingTestComponent } from './components/ping-test/ping-test.component';

const routes: Routes = [
  {
    path: '',
    component: PingTestComponent
  },
];

export const PingTestRoutes = RouterModule.forChild(routes);
