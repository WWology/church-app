import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { definePreset, palette } from "@primeuix/themes";
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from "primeng/config";
import { routes } from './app.routes';

const Notitia = definePreset(Aura, {
  semantic: {
    primary: palette('{slate}'),
    colorScheme: {
      light: {
        primary: {
          color: '{slate.950}',
          inverseColor: '#ffffff',
          hoverColor: '{slate.900}',
          activeColor: '{slate.800}'
        },
        highlight: {
          background: '{slate.950}',
          focusBackground: '{slate.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      },
      dark: {
        primary: {
          color: '{slate.400}',
          inverseColor: '{slate.950}',
          hoverColor: '{slate.300}',
          activeColor: '{slate.200}'
        },
        highlight: {
          background: 'rgba(148, 163, 184, .16)',
          focusBackground: 'rgba(148, 163, 184, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        },
        surface: {
          0: '#1e293b',      // Main background (slate-800)
          50: '#475569',      // Lighter surface
          100: '#334155',     // Card backgrounds
          200: '#1e293b',     // Default surface
          300: '#1e293b',
          400: '#1e293b',
          500: '#0f172a',     // Darker surface (slate-900)
          600: '#0f172a',
          700: '#020617',     // Darkest surface (slate-950)
          800: '#020617',
          900: '#020617',
          950: '#000000'
        },
        text: {
          color: 'rgba(255, 255, 255, 0.87)',           // Primary text
          hoverColor: 'rgba(255, 255, 255, 1)',         // Hover text
          mutedColor: 'rgba(255, 255, 255, 0.60)',      // Muted text
          hoverMutedColor: 'rgba(255, 255, 255, 0.87)'  // Muted hover text
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
        preset: Notitia,
        options: {
            darkModeSelector: '.notitia-dark',
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
      }
    })
  ]
};
