import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { AuthStore } from './auth-store';

export const authGuard: CanActivateChildFn = (_, state) => {
  const loginTree = inject(Router).createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });

  return inject(AuthStore).isAuthenticated()
    ? true
    : new RedirectCommand(loginTree, {
        replaceUrl: true,
      });
};

export const publicOnlyGuard: CanActivateFn = (route) => {
  if (route.queryParamMap.get('justRegistered') === 'true') {
    return true;
  }

  return inject(AuthStore).isAuthenticated()
    ? new RedirectCommand(inject(Router).parseUrl('/people'), {
        replaceUrl: true,
      })
    : true;
};
