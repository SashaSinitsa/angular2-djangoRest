import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular2-material/button';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [MdButtonModule, RouterModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})

export class NavbarModule { }
