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

  async getAvatarUrl(uid: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('people')
      .select('avatar_url')
      .eq('id', uid)
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching avatar URL:', error);
      return null;
    }

    return data?.avatar_url ?? null;
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
