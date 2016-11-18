import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular2-material/card';
import { AboutComponent } from './about.component';


@NgModule({
    imports: [CommonModule, MdCardModule],
    declarations: [AboutComponent],
    exports: [AboutComponent]
})
export class AboutModule { }
