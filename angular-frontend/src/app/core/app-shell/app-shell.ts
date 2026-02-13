import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, isActive, Router, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, MenubarModule, ButtonModule],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  private authService = inject(AuthService);
  private router = inject(Router);

  navItems: MenuItem[] = [
    {
      label: 'People',
      items: [
        {
          label: 'People',
          command: () => {
            this.navItems[0].label = 'People';
            this.router.navigate(['/people']);
          },
        },
        {
          label: 'Groups',
          command: () => {
            this.navItems[0].label = 'Groups';
            this.router.navigate(['/groups']);
          },
        },
        {
          label: 'Services',
          command: () => {
            this.navItems[0].label = 'Services';
            this.router.navigate(['/services']);
          },
        },
        {
          label: 'Settings',
          routerLink: '/settings',
        },
      ],
    },
  ];

  logout() {
    this.authService.signOut();
  }
}
