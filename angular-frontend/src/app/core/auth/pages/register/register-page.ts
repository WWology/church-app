import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';

import { CardModule } from 'primeng/card';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

import { AuthService } from '../../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    FormField,
    InputGroup,
    InputGroupAddonModule,
    InputTextModule,
    MessageModule,
    RouterLink,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private authService = inject(AuthService);

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
  }
}
