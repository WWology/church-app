import { Routes } from '@angular/router';
import { LoginPage } from './core/auth/pages/login/login-page';
import { RegisterPage } from './core/auth/pages/register/register-page';
import { authGuard, publicOnlyGuard } from './core/auth/auth-guard';
import { NotFound } from './core/not-found/not-found';
import { ResetPasswordPage } from './core/auth/pages/reset-password/reset-password-page';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'people',
        pathMatch: 'full',
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
    component: NotFound,
  },
];
