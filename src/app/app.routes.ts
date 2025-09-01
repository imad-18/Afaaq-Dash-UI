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
  },
  {
    path: 'statistics',
    loadComponent: () => import('./components/statistics/statistics')
      .then(m => m.Statistics)
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile')
      .then(m => m.Profile)
  }
];
