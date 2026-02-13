import { Routes } from '@angular/router';

import { PeoplePage } from './pages/people-page/people-page';
import { PeopleDetailPage } from './pages/people-detail-page/people-detail-page';

export const peopleRoutes: Routes = [
  {
    path: '',
    component: PeoplePage,
  },
  {
    path: ':id',
    component: PeopleDetailPage,
  },
];
