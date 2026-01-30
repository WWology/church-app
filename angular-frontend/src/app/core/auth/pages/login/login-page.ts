import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../../auth.service';
import { sign } from 'crypto';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    FloatLabelModule,
    FormField,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    MessageModule,
    RouterLink,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loading = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });

    required(fieldPath.password, { message: 'Password is required' });
    minLength(fieldPath.password, 6, { message: 'Password must be at least 6 characters long' });
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);

    if (this.loginForm().pending()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Validation Pending',
        detail: 'Please wait for validation to complete.',
      });
      return;
    }

    if (this.loginForm().invalid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please correct the errors in the form before submitting.',
      });
      return;
    }

    try {
      const formData = this.loginModel();
      const { error } = await this.authService.signInWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error.message,
        });
      }
    } finally {
      this.loading.set(false);
    }
  }
}
