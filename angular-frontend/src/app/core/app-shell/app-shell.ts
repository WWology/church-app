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
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shell',
  imports: [
    AvatarModule,
    ButtonModule,
    DividerModule,
    MenubarModule,
    PopoverModule,
    RouterLinkActive,
    RouterLinkWithHref,
    RouterOutlet,
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  private authService = inject(AuthService);
  private router = inject(Router);

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
  private isSettingsActive = isActive('/settings', this.router, this.matchOptions);

  // Use computed to reactively update the menu items when routes change
  navItems = computed<MenuItem[]>(() => {
    // Determine the main label based on active route
    let currentLabel: string;
    if (this.isGroupsActive()) {
      currentLabel = 'Groups';
    } else if (this.isServicesActive()) {
      currentLabel = 'Services';
    } else if (this.isSettingsActive()) {
      currentLabel = 'Settings';
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
          {
            label: 'Settings',
            routerLink: '/settings',
            disabled: this.isSettingsActive(),
          },
        ],
      },
    ];
  });

  logout() {
    this.authService.signOut();
  }
}
