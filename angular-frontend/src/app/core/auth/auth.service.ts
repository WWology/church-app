import { Injectable } from '@angular/core';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
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
