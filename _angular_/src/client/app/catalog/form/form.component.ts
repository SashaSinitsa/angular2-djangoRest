import { Component } from '@angular/core';


@Component({
  template: `<h6><b> >>здесь<<  любой блок через router-outlet... </b></h6>
<br>
<br>
<br>
<h6><b> >>здесь<<  любой блок через router-outlet... </b></h6>

<!--<div class="demo-button">
  <section>
    <button md-button>flat</button>
    <button md-raised-button>raised</button>
    <button md-fab>
      <md-icon class="md-24">check</md-icon>
    </button>
    <button md-mini-fab>
      <md-icon class="md-24">check</md-icon>
    </button>
  </section>

  <section>
    <a href=" " md-button color="primary">SEARCH</a>
    <a href=" " md-raised-button>SEARCH</a>
    <a href=" " md-fab>
      <md-icon class="md-24">check</md-icon>
    </a>
    <a href=" " md-mini-fab>
      <md-icon class="md-24">check</md-icon>
    </a>
  </section>

  <section>
    <button md-button color="primary">primary</button>
    <button md-button color="accent">accent</button>
    <button md-button color="warn">warn</button>
  </section>

  <section>
    <button md-raised-button color="primary">primary</button>
    <button md-raised-button color="accent">accent</button>
    <button md-raised-button color="warn">warn</button>
  </section>

  <section>
    <button md-fab color="primary">
      <md-icon class="md-24">home</md-icon>
    </button>
    <button md-fab color="accent">
      <md-icon class="md-24">favorite</md-icon>
    </button>
    <button md-fab color="warn">
      <md-icon class="md-24">feedback</md-icon>
    </button>
  </section>

  <section>
    <button md-icon-button color="primary">
      <md-icon class="md-24">menu</md-icon>
    </button>

    <button md-icon-button color="accent">
      <md-icon class="md-24">favorite</md-icon>
    </button>

    <button md-icon-button>
      <md-icon class="md-24">more_vert</md-icon>
    </button>
  </section>

  <section>
    <div>
      <p>isDisabled: {{isDisabled}}, clickCounter: <span>{{clickCounter}}</span></p>
      <button md-raised-button (click)="isDisabled=!isDisabled">
        Disable buttons
      </button>
      <button md-raised-button (click)="button1.focus()">Focus 1</button>
      <button md-raised-button (click)="button2.focus()">Focus 2</button>
      <button md-raised-button (click)="button3.focus()">Focus 3</button>
    </div>
    <button md-button #button1 [disabled]="isDisabled" (click)="clickCounter=clickCounter+1">off</button>
    <button md-button color="primary" [disabled]="isDisabled">off</button>
    <a href=" " #button2 md-button color="accent" [disabled]="isDisabled">off</a>
    <button md-raised-button #button3 color="primary" [disabled]="isDisabled">off</button>
    <button md-mini-fab [disabled]="isDisabled">
      <md-icon class="md-24">check</md-icon>
    </button>

    <button md-icon-button color="accent" [disabled]="isDisabled">
      <md-icon class="md-24">favorite</md-icon>
    </button>
  </section>
  <section>
    <a href=" " md-button color="primary">SEARCH</a>
    <button md-button>DANCE</button>
  </section>
  <section>
    <a href=" " md-raised-button color="primary">SEARCH</a>
    <button md-raised-button>DANCE</button>
  </section>
  <button md-button disabled> Disabled button. </button>
<button md-button [disabled]="isDisabled"> Disabled button. </button>
<a href="" md-button > Disabled link button. </a>
</div>
-->
  `
})

export class FormComponent {}
