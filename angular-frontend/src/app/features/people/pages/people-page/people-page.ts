import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'people-page',
  imports: [],
  templateUrl: './people-page.html',
  styleUrl: './people-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePage {}
