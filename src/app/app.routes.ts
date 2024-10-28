import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
      canActivate:[LoginGuard]
  },
  {
    path:'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
      canActivate:[AuthGuard]
  },
  {
    path:'story-list',
    loadComponent: () =>
      import('./pages/story/story-list/story-list.component').then(
        (c) => c.StoryListComponent
      ),
      canActivate:[AuthGuard]
  },
  {
    path:'sprint-management',
    loadComponent: () =>
      import('./pages/sprint/sprint-managament/sprint-managament.component').then(
        (c) => c.SprintManagamentComponent
      ),
      canActivate:[AuthGuard]
  }
];
