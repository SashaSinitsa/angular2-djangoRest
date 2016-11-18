import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
// import { NgForm }    from '@angular/forms';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { Item } from './../catalog.model';
import { ListItemsService } from './../catalog.service';

@Component({
  moduleId: module.id,
  selector: 'sd-form',
  styleUrls: ['./form-edit.css'],
  templateUrl: './form-edit.template.html'
})

export class FormEditComponent implements OnInit {
  @Output() added = new EventEmitter();
  @Output() edited = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Input() item: Item;

  manufacturers = ['ЗМЗ', 'ПАЗ', 'АвтоПрибор', 'ММЗ', 'Дорожная карта'];
  units = ['шт', 'м', 'комп', 'л'];
  model = new Item(0, '', '', '', '', 'шт', '');
  active = true;
  novalidate = false;

  constructor(private listItemsService: ListItemsService) { };


  ngOnInit() {
    this.editItem();
  }


  save() {
    if (this.model.id === 0) {
      this.added.emit(this.model);
    } else {
      this.edited.emit(this.model);
    }
  }


  cancel() {
    this.canceled.emit(null);
  }


  private editItem() {
    setTimeout(() => {
      if (this.item) {
        this.model = this.clone();
      }
    }, 0);
  }


// клон используется при редактировании item, при сохранении заменяет оригинал
  private clone(): Item {
    let cloneItem: any = {};
    for (let key in this.item) {
      if (typeof (<any>this.item)[key] === 'object') {
        cloneItem[key] = this.clone();
      } else {
        cloneItem[key] = (<any>this.item)[key];
      }
    }
    return cloneItem;
  }


}
