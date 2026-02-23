import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import { AuthStore } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly authStore = inject(AuthStore);

  private router = inject(Router);
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // CENTRAL AUTH HUB: Listens to every auth event (login, logout, token refresh, etc.)
    this.supabase.auth.onAuthStateChange((event, session) => {
      // 1. Update State
      // Always keep the signal in sync with the current session.
      this.authStore.setUser(session?.user || null);

      // 2. Redirect to /login on SIGNED_OUT
      if (event === 'SIGNED_OUT') {
        const returnUrl = this.router.url;

        this.router.navigate(['/login'], {
          queryParams: { returnUrl },
        });
      }
    });
  }

  // Called by AuthGuard to verify session before route activation.
  // We also update the signal here to ensure the state is fresh immediately on load.
  async getUser() {
    const { data } = await this.supabase.auth.getSession();
    this.authStore.setUser(data.session?.user || null);
  }

  signUp(email: string, password: string, fullName: string) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
