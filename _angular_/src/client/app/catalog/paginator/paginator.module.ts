import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule,],
    declarations: [PaginatorComponent],
    exports: [PaginatorComponent]
})

export class PaginatorModule { }
