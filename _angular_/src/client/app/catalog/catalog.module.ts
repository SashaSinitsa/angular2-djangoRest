import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';

import { ListItemsService } from './catalog.service';
import { HeadTable } from './catalog.model';
import { PaginatorModule } from './paginator/paginator.module';
import { FormEditModule } from './form-edit/form-edit.module';
// import { catalogRouting } from './catalog.routes';

import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PaginatorModule,
        FormEditModule,
        // catalogRouting
        ],
    declarations: [FormComponent, CatalogComponent],
    exports: [CatalogComponent],
    providers: [ListItemsService, HeadTable],
})

export class CatalogModule { }
