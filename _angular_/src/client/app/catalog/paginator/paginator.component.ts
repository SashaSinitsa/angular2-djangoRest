
import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

import { IItem } from './../catalog.model';


@Component({
  moduleId: module.id,
  selector: 'sd-paginator',
  styleUrls: ['./paginator.css'],
  templateUrl: './paginator.template.html',
})


export class PaginatorComponent implements OnInit, OnChanges {
  @Input() newItems: IItem[];
  @Input() paginatorUpdated: boolean;
  @Output() updatePag = new EventEmitter();

  paginatorItems: IItem[];
  paginatorLength: number;
  pages: number;
  page = 1;
  count = 5;
  Math = Math;
  listPages: number[];
  selectedPage: Element;


  ngOnInit() {
    this.createPaginator();
  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.page = 1;
    setTimeout(() => { this.updatePaginator(); }, 0);
    this.selectedPage = document.getElementsByClassName('lineNumber')[0];
  }


  updatePaginator() {
    this.createPaginatorItems();
    this.createPaginator();
    this.updatePag.emit(this.paginatorItems);
  }


  createPaginator() {
    this.pages = Math.ceil((<any>this.newItems).length / +this.count);
    this.createNumbersPages();
  }


  createNumbersPages() {
    let arr: number[] = [];
    for (let i = 1; i <= this.pages; i++) {
      arr.push(i);
    }
    this.listPages = arr;
  }


  createPaginatorItems() {
    this.paginatorItems = (<any>this.newItems).slice(this.count * (this.page - 1), this.count * this.page);
    this.paginatorLength = this.paginatorItems.length;
  }

  selectPage(page: HTMLTableRowElement) {
    this.selectedPage = page;
  }


}
