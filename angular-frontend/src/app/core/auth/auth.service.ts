import { computed, inject, Injectable, NgZone, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private supabase: SupabaseClient;

  // READ/WRITE Signal: This is the single source of truth for the User state.
  private _currentUser = signal<User | null>(null);

  // READ-ONLY Signal: Publicly exposed state for components to consume.
  currentUser = this._currentUser.asReadonly();

  // DERIVED STATE: Automatically re-calculates whenever 'currentUser' changes.
  // Useful for templates checking: @if (auth.isAuthenticated()) { ... }
  readonly isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // CENTRAL AUTH HUB: Listens to every auth event (login, logout, token refresh, etc.)
    this.supabase.auth.onAuthStateChange((event, session) => {
      // 1. Update State
      // Always keep the signal in sync with the current session.
      this._currentUser.set(session?.user || null);

      // 2. Redirect to /login on SIGNED_OUT
      if (event === 'SIGNED_OUT') {
        const returnUrl = this.router.url;
        console.log(returnUrl);

        this.router.navigate(['/login'], {
          queryParams: { returnUrl },
        });
      }
    });
  }

  // Called by AuthGuard to verify session before route activation.
  // We also update the signal here to ensure the state is fresh immediately on load.
  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getSession();
    this._currentUser.set(data.session?.user || null);
    return data.session?.user || null;
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
