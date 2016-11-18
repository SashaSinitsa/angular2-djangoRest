import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { CatalogModule } from './catalog.module';

export function main() {
   describe('Catalog component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [CatalogModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let catalogDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(catalogDOMEl.querySelectorAll('.container-top').length).toEqual(1);

          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-catalog></sd-catalog>'
})
class TestComponent {}
