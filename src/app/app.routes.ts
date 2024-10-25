import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path:'story-list',
    loadComponent: () =>
      import('./pages/story/story-list/story-list.component').then(
        (c) => c.StoryListComponent
      ),
  },
  {
    path:'sprint-management',
    loadComponent: () =>
      import('./pages/sprint/sprint-managament/sprint-managament.component').then(
        (c) => c.SprintManagamentComponent
      ),
  }
];
