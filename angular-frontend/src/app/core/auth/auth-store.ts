import { User } from '@supabase/supabase-js';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    isAuthenticated: () => Boolean(state.user()),
  })),
  withMethods((store) => ({
    setUser(user: User | null): void {
      patchState(store, (state) => ({
        user: user,
      }));
    },
  })),
);
