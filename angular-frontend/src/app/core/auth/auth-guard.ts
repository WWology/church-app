import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const session = await authService.getSession();

  const loginTree = router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });

  return session
    ? true
    : new RedirectCommand(loginTree, {
        replaceUrl: true,
      });
};

export const publicOnlyGuard: CanActivateFn = async (route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (route.queryParamMap.get('justRegistered') === 'true') {
    return true;
  }

  const session = await authService.getSession();

  return session
    ? new RedirectCommand(router.parseUrl('/people'), {
        replaceUrl: true,
      })
    : true;
};
