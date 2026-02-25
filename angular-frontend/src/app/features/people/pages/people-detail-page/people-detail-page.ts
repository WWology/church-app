import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'people-detail-page',
  imports: [],
  templateUrl: './people-detail-page.html',
  styleUrl: './people-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleDetailPage {}
