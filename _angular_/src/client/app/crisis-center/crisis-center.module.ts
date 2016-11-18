import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';



import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisListComponent }   from './crisis-list.component';

import { crisisCenterRouting } from './crisis-center.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    crisisCenterRouting

  ],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,

  ],

  providers: [

  ]
})
export class CrisisCenterModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
