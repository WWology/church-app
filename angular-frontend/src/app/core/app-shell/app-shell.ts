import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'; // Removed signal, added computed
import {
  isActive,
  IsActiveMatchOptions, // Added
  Router,
  RouterLinkActive,
  RouterLinkWithHref,
  RouterOutlet,
} from '@angular/router';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { FormsModule } from '@angular/forms';
import { AuthStore } from '../auth/auth-store';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shell',
  imports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DividerModule,
    FormsModule,
    MenubarModule,
    PopoverModule,
    RouterLinkActive,
    RouterLinkWithHref,
    RouterOutlet,
    ToggleSwitchModule,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  readonly authStore = inject(AuthStore);
  private authService = inject(AuthService);
  private router = inject(Router);

  darkMode = false;

  // Define options once for reuse
  private readonly matchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  // Create stable signals for each route's active state
  private isPeopleActive = isActive('/people', this.router, this.matchOptions);
  private isGroupsActive = isActive('/groups', this.router, this.matchOptions);
  private isServicesActive = isActive('/services', this.router, this.matchOptions);

  // Use computed to reactively update the menu items when routes change
  navItems = computed<MenuItem[]>(() => {
    // Determine the main label based on active route
    let currentLabel: string;
    if (this.isGroupsActive()) {
      currentLabel = 'Groups';
    } else if (this.isServicesActive()) {
      currentLabel = 'Services';
    } else {
      currentLabel = 'People';
    }

    return [
      {
        label: currentLabel,
        items: [
          {
            label: 'People',
            routerLink: '/people',
            disabled: this.isPeopleActive(),
          },
          {
            label: 'Groups',
            routerLink: '/groups',
            disabled: this.isGroupsActive(),
          },
          {
            label: 'Services',
            routerLink: '/services',
            disabled: this.isServicesActive(),
          },
        ],
      },
    ];
  });

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('notitia-dark');
  }

  logout() {
    this.authService.signOut();
  }
}
