import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';

import { MdIconModule } from '@angular2-material/icon';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [MdToolbarModule, MdIconModule ,MdButtonModule],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
})

export class ToolbarModule { }
