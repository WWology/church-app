import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'not-found-page',
  imports: [CardModule],
  template: `
    <div class="flex min-h-svh flex-col items-center justify-center bg-gray-100 p-6 md:p-10">
      <div class="w-full max-w-sm md:max-w-3xl">
        <div class="flex flex-col gap-6">
          <p-card class="overflow-hidden p-0">
            <div class="grid p-0 md:grid-cols-2">
              <div class="flex flex-col items-center gap-3 justify-center p-6 md:p-8">
                <h1 class="text-5xl text-center"><b>404</b></h1>
                <h2 class="text-center">
                  Sorry but the page you are looking for does not exist, has been removed, name
                  changed or is temporarily unavailable.
                </h2>
              </div>
              <div class="relative hidden md:flex md:items-center md:justify-center">
                <img src="gka.svg" alt="placeholder" class="dark:brightness-[0.2] dark:grayscale" />
              </div>
            </div>
          </p-card>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NotFoundPage {}
