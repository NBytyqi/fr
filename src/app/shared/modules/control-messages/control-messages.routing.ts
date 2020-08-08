import { ControlMessagesComponent } from './control-messages.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ControlMessagesComponent
  },
];

export const ControlMessagesRoutes = RouterModule.forChild(routes);
