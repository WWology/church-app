import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../../auth.service';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'register-page',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    FormField,
    InputGroupAddonModule,
    InputGroup,
    InputTextModule,
    MessageModule,
    RouterLink,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loading = signal(false);

  registerModel = signal<RegisterData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.fullName, { message: 'Full name is required' });

    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });

    required(fieldPath.password, { message: 'Password is required' });
    minLength(fieldPath.password, 6, { message: 'Password must be at least 6 characters long' });

    validate(fieldPath.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(fieldPath.password);

      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);

    if (this.registerForm().pending()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Validation Pending',
        detail: 'Please wait for validation to complete.',
      });
      this.loading.set(false);
      return;
    }

    if (this.registerForm().invalid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please correct the errors in the form before submitting.',
      });
      this.loading.set(false);
      return;
    }

    try {
      const formData = this.registerModel();
      const { error } = await this.authService.signUp(
        formData.email,
        formData.password,
        formData.fullName,
      );
      if (error) throw error;
      this.messageService.add({
        severity: 'success',
        summary: 'Check your email',
        detail: 'Registration successful! Please check your email to verify your account.',
      });
    } catch (error) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error.message,
        });
      }
    } finally {
      this.registerForm().reset();
      this.registerModel.set({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      this.loading.set(false);
    }
  }
}
