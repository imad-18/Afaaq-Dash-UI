import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full'
  },
  {
    path: 'campaigns',
    loadComponent: () => import('./components/campaigns/campaigns')
      .then(m => m.Campaigns)
  },
  {
    path: 'activities',
    loadComponent: () => import('./components/activities/activities')
      .then(m => m.Activities)
  }
];
