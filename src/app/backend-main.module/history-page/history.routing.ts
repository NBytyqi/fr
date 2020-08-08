import { HistoryPageComponent } from './history-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
   },
];

export const HistoryRoutes = RouterModule.forChild(routes);
