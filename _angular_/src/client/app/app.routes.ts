import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { CatalogRoutes } from './catalog/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...CatalogRoutes,
  { path: '**', redirectTo: '' }
//  {
//     path: 'crisis-center',
//     loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
//   }

  // { path: '**', redirectTo: '/' },
];
