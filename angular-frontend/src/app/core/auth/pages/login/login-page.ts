import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../../auth.service';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'login-page',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });

    required(fieldPath.password, { message: 'Password is required' });
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
      this.loading.set(false);
      return;
    }

    if (this.loginForm().invalid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please correct the errors in the form before submitting.',
      });
      this.loading.set(false);
      return;
    }

    try {
      const formData = this.loginModel();
      const { error } = await this.authService.signInWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      if (error) throw error;
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/people';
      console.log(returnUrl);
      this.router.navigateByUrl(returnUrl);
    } catch (error) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error.message,
        });
      }
    } finally {
      this.loginForm().reset();
      this.loginModel.set({
        email: '',
        password: '',
      });
      this.loading.set(false);
    }
  }
}
