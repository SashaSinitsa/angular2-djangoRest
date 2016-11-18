import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditComponent } from './form-edit.component';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule],
    declarations: [FormEditComponent],
    exports: [FormEditComponent]
})

export class FormEditModule { }
