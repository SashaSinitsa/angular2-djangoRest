import { Route } from '@angular/router';
// import { Routes, Route, RouterModule } from '@angular/router';

import { CatalogComponent } from './index';
// import { FormComponent } from './form/form.component';


///////

export const CatalogRoutes: Route[] = [
  {
    path: 'catalog',
    component: CatalogComponent
  }
];

// не работает на продакшене, нужно убрать CatalogModule в app.module.

// export const CatalogRoutes: Routes = [
//  {
//     path: 'catalog',
//     loadChildren: 'app/catalog/catalog.module#CatalogModule'
//   }
// ];


// const catalogRoutes: Routes = [
//   {
//     path: '',
//     component: CatalogComponent,
//     children: [
//       { path: '1', component: FormComponent },
//       { path: '', component: FormComponent }
//     ]
//   }
// ];

// export const catalogRouting = RouterModule.forChild(catalogRoutes);
