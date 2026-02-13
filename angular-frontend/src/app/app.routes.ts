import { Routes } from '@angular/router';
import { LoginPage } from './core/auth/pages/login/login-page';
import { RegisterPage } from './core/auth/pages/register/register-page';
import { authGuard, publicOnlyGuard } from './core/auth/auth-guard';
import { NotFoundPage } from './core/not-found/not-found-page';
import { ResetPasswordPage } from './core/auth/pages/reset-password/reset-password-page';
import { AppShell } from './core/app-shell/app-shell';
import { peopleRoutes } from './features/people/people.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppShell,
    children: [
      {
        path: '',
        redirectTo: 'people',
        pathMatch: 'full',
      },
      {
        path: 'people',
        children: peopleRoutes,
      },
      {
        path: 'groups',
        loadChildren: () => import('./features/groups/groups.routes').then((r) => r.groupsRoutes),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.routes').then((r) => r.servicesRoutes),
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'resetpassword',
    component: ResetPasswordPage,
    canActivate: [publicOnlyGuard],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
