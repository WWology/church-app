import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { User } from '@supabase/supabase-js';

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
