import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { CardModule } from "primeng/card";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { AuthService } from '../../auth.service';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [CardModule, FormField, InputGroupModule, InputGroupAddonModule, InputTextModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  })

  loginForm = form(this.loginModel);

  async onSubmit()  {
    try {
      const formData = this.loginModel();
      await this.authService.signInWithEmailAndPassword(formData.email, formData.password);
    } catch (error) {
      console.error('Login failed', error);}
  }
}
