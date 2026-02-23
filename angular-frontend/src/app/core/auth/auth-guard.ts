import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { AuthStore } from './auth-store';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (_route, state) => {
  const authService = inject(AuthService);
  const store = inject(AuthStore);
  const router = inject(Router);

  await authService.getUser();

  const loginTree = router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  return store.isAuthenticated()
    ? true
    : new RedirectCommand(loginTree, {
        replaceUrl: true,
      });
};

export const publicOnlyGuard: CanActivateFn = async (route, _state) => {
  const authService = inject(AuthService);
  const store = inject(AuthStore);
  const router = inject(Router);

  if (route.queryParamMap.get('justRegistered') === 'true') {
    return true;
  }

  await authService.getUser();

  return store.isAuthenticated()
    ? new RedirectCommand(router.parseUrl('/people'), {
        replaceUrl: true,
      })
    : true;
};
