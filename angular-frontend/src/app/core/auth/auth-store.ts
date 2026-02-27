import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { User } from '@supabase/supabase-js';

import { AuthService } from './auth.service';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    authService: inject(AuthService),
    router: inject(Router),
  })),
  withComputed((state) => ({
    isAuthenticated: () => Boolean(state.user()),
    displayName: () => state.user()?.user_metadata?.['full_name'] || 'Anonymous',
    avatar: () => {
      const id = state.user()?.id;
      return null;
    },
    uid: () => state.user()?.id,
  })),
  withMethods(({ authService, ...store }) => ({
    // Initialize the store by checking for an existing session
    async init() {
      const {
        data: { session },
      } = await authService.getSession();
      patchState(store, { user: session?.user ?? null });
    },
    setUser(user: User | null): void {
      patchState(store, { user });
    },
  })),
  withHooks({
    onInit({ router, ...store }) {
      // register auth state change listeners
      store.authService.onAuthStateChange((event, session) => {
        patchState(store, { user: session?.user ?? null });

        if (event === 'SIGNED_OUT') {
          router.navigate(['/login'], {
            queryParams: { returnUrl: router.url },
          });
        }
      });
    },
  }),
);
