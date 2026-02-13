import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loginTree = router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });

  const user = await authService.getUser();

  return user
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

  const user = await authService.getUser();

  return user
    ? new RedirectCommand(router.parseUrl('/people'), {
        replaceUrl: true,
      })
    : true;
};
