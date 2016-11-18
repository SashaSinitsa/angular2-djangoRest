import { Component, OnInit, ViewChildren, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { ElementRef, trigger, state, style, transition, animate } from '@angular/core';


import { HeadTable, Item, IHeadTable } from './catalog.model';
import { ListItemsService } from './catalog.service';
// import { FormEditComponent } from './form-edit/form-edit.component';
// import { PaginatorComponent } from './paginator/paginator.component';


@Component({
  moduleId: module.id,
  selector: 'sd-catalog',
  templateUrl: './catalog.template.html',
  styleUrls: ['./catalog.css'],
  // directives: [FormEditComponent, PaginatorComponent],
  animations: [
    trigger('detail', [
      state('inactive', style({ height: '0' })),
      state('active', style({ height: '*' })),
      transition('inactive => active', animate(250)),
      transition('active => inactive', animate(250))
    ])
  ]
})

export class CatalogComponent implements OnInit, AfterViewInit {

  @ViewChildren('tdChecked') tdChecked: QueryList<ElementRef>;
  @ViewChild('tableHead') tableHead: ElementRef;
  @ViewChild('boxHead') boxHead: ElementRef;
  title: string = 'My table';
  items: Item[];
  itemsString: string;
  newItems: Item[];
  paginatorItems: Item[];
  paginatorUpdated = false;
  listHead: IHeadTable[];
  selectedRow: HTMLTableRowElement;
  formVisible: boolean = false;
  textareaVisible: boolean = false;
  item: Item;
  toggleChecked = false;
  basket = true;
  togglerSetting = 'inactive';
  togglerTextarea = 'inactive';
  togglerExtra: string[];
  novalidate = false;
  fileName = '';
  cols = {
    col0: true,
    col1: true,
    col2: true,
    col3: true,
    col4: true,
    col5: true,
    col6: true,
    col7: true,
  };
  private thOld: HTMLTableCellElement;
  private listHeadWidth: number[];
  private sum: number;

  constructor(private headTable: HeadTable, private listItemsService: ListItemsService) { }


  ngOnInit() {
    this.getItemsHead();
    this.getItems();
    this.generateTogglerExtra();
  }


  ngAfterViewInit() {
    // setTimeout(() => console.log(<HTMLInputElement>document.getElementsByName("checkboxItem")[1]), 1000)
    // setTimeout(() => this.tdChecked.toArray().forEach((child)=>console.log(child.nativeElement.checked)),1000)
  }


  onScroll(event: Event) {
    this.toggleDisplayHead();
  }


  // получаем item-ов
  getItems() {
    this.listItemsService.getItems()
      .then(items => {
        this.items = items;
        this.updateItems();
        this.paginatorItems = items;
      });
  }


  // запрос на получение файла
  download(name: string) {
    this.listItemsService.getFile(name);
  }


  // получаем имя выбраного файла 
  // (необходимо для оформления input[type="file"])
  getName(str: string) {
    let i = 0;
    if (str.lastIndexOf('\\')) {
      i = str.lastIndexOf('\\') + 1;
    } else {
      i = str.lastIndexOf('/') + 1;
    }
    let filename = str.slice(i);
    let uploaded = document.getElementById('fileFormLabel');
    uploaded.innerHTML = filename;
  }


  // заносим содержимое файла, в textarea
  getFileInner() {
    let file = (<any> document.getElementById('upload')).files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let textArea = document.getElementById('jsonSave');
      let json = JSON.parse((<any> e.target).result);
      (<any> textArea).value = JSON.stringify(json, null, '\t');
    };
    reader.readAsText(file);
  }


  // при скроле вверх шапка списка фиксируется вверху окна 
  toggleDisplayHead() {
    let el = this.tableHead.nativeElement;
    let top = this.boxHead.nativeElement.getBoundingClientRect().top;
    if (top < 0) {
      el.classList.remove('table-head-abs');
      el.classList.add('table-head-fixed');
    } else {
      el.classList.add('table-head-abs');
      el.classList.remove('table-head-fixed');
    }
  }


  // получаем имена колонок списка
  getItemsHead() {
    this.listHeadWidth = this.headTable.itemsHead.map((item) => item.width);
    this.listHead = this.headTable.itemsHead;
    this.changeWidth();
  }


  // анимация скрытия div-ов
  toggleSettings() {
    (this.togglerSetting === 'inactive') ? this.togglerSetting = 'active' : this.togglerSetting = 'inactive';
  }

  toggleTextarea() {
    (this.togglerTextarea === 'inactive') ? this.togglerTextarea = 'active' : this.togglerTextarea = 'inactive';
  }

  toggleExtra(i: number) {
    (this.togglerExtra[i] === 'inactive') ? this.togglerExtra[i] = 'active' : this.togglerExtra[i] = 'inactive';
  }


  // прячем отключенные колонки
  toggleCol(i: number) {
    let col = 'col' + i; // получаем название класса

    (<any>this.cols)[col] = !(<any>this.cols)[col];

    if ((<any>this.cols)[col]) { // если класс не "hide"
      if (!this.sum) {           // если ни одна колонка не отображается
        this.listHead[i].width = 10;
        this.sum = this.listHead.reduce((sum, current) => sum + current.width, 0);
        return;
      }
      this.listHead[i].width = this.listHeadWidth[i] * this.sum / (this.sum - this.listHeadWidth[i]);
    } else {
      this.listHead[i].width = 0;
    }
    this.changeWidth();
  }


  // запрос на добавление item 
  onItemAdded(item: Item) {
    this.listItemsService.addItem(item)
      .then(item => this.addItem(item));
    this.toggleForm();
  }


  //  запрос на изменение item
  onItemEdited(item: Item) {
    this.listItemsService.editItem(item)
      .then(item => this.editItem(item));
    this.toggleForm();
  }


  // запрос на удаление item
  onItemsDeleted() {
    this.tdChecked.toArray().forEach((child) => {
      let native = child.nativeElement;
      let value: number = child.nativeElement.value;

      if (native.checked) {
        this.listItemsService.deleteItem(value)
          .then((value) => this.deleteItem(value));
      }
    });
  }


  // запрос не редактирование json
  onJsonSaved(json: string) {
    json = JSON.parse(json);
    return this.listItemsService.jsonSave(json)
      .then(json => this.saveJson(json));
  }


  // отображаем или скрываем форму
  toggleForm() {
    setTimeout(() => {
      this.formVisible = !this.formVisible;
      if (!this.formVisible) {
        this.item = null;
      }
    }, 0);
  }


  // фильтруем items по введенной строке
  searchItems(search: string): void {
    if (!this.items) return null;
    this.newItems = this.items.filter(item =>
      (item.title.indexOf(search) !== -1) || (item.number.indexOf(search) !== -1));
  }


  // сортируем items
  sortedListItems(name: string, th: HTMLTableCellElement) {
    let one: number;

    this.toggleClass(th);

    if (th.classList.contains('sort-asc')) {
      one = 1;
    } else if (th.classList.contains('sort-desc')) {
      one = -1;
    }
    this.newItems = this.newItems.sort((a: any, b: any) => {
      if (a[name] < b[name]) {
        return -one;
      } else if (a[name] > b[name]) {
        return one;
      } else return 0;
    });

    this.paginatorUpdated = !this.paginatorUpdated;
  }


  // выделяем выбранную строку списка
  selectRow(row: HTMLTableRowElement) {
    this.selectedRow = row;
  }


  // запоминаем выбранный item в случае редактирования
  beginEditItem(item: Item) {
    this.item = item;
  }


  // обновляем список после обработки пагинатором
  updatePag(paginatorItems: Item[]) {
    this.paginatorItems = paginatorItems;
    this.generateTogglerExtra();
  }


  // групповое переключение чекбоксов и подсветка корзины
  toggleCheck() {
    this.basket = false;
    this.toggleChecked = !this.toggleChecked;
    if (!this.toggleChecked) this.basket = true;
  }


  // делаем колонку шире
  addWidth(i: number) {
    if (this.listHead[i].width > 0) {
      this.listHead[i].width = this.listHead[i].width + 1;
      this.changeWidth();
    }
  }


  // делаем колонку уже
  subtractWidth(i: number) {
    if (this.listHead[i].width > 6) {
      this.listHead[i].width = this.listHead[i].width - 1;
      this.changeWidth();
    }
  }



  // изменяет ширину колонок 
  private changeWidth() {
    let min = 50; // %
    let iMin: number;
    let width: number;

    this.sum = this.listHead.reduce((sum, current) => sum + current.width, 0);
    if (!this.sum) return;

    for (let i = 0; i < this.listHead.length; i++) {
      this.listHead[i].width = Math.floor(10000 * 100 * this.listHead[i].width / this.sum) / 10000;

      // задаем минимальную ширину
      width = this.listHead[i].width;
      if (1 < width && width < 6) {
        this.listHead[i].width = 6;
      }

      // компенсируем рост узких ячеек
      if (width < min && width > 0) {
        min = width;
        iMin = i;
      }

    }
    // ...компенсируем рост узких ячеек
    if (this.listHead[iMin]) {
      this.listHead[iMin].width = this.listHead[iMin].width + 0.5;
    }

    // повторный цикл после компенсации: чтобы не превысить 92%
    // ( 8% занимают крайние колонки и не участвуют в рассчетах)
    this.sum = this.listHead.reduce((sum, current) => sum + current.width, 0);

    for (let i = 0; i < this.listHead.length; i++) {
      this.listHead[i].width = Math.floor(10000 * 92 * this.listHead[i].width / this.sum) / 10000;
    }
  }


  // генерируем список вида: togglerExtra['inactive', 'inactive', ...]
  // для хранения состояния отображения каждой строчки списка
  private generateTogglerExtra() {
    this.togglerExtra = [];
    for (let i = 0; i < 100; i++) {
      this.togglerExtra[i] = 'inactive';
    }
  }


  private updateItems() {
    this.newItems = this.items;
    this.itemsString = JSON.stringify(this.items, null, '\t');
    this.listItemsService.initItems(this.items);
    this.paginatorUpdated = !this.paginatorUpdated;
  }


  private addItem(item: Item) {
    this.items.push(item);
    this.updateItems();
  }


  private editItem(item: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        this.items.splice(i, 1, item);

        for (let j = 0; j < this.newItems.length; j++) {
          if (this.newItems[j].id === item.id) {
            this.newItems.splice(j, 1, item);

 console.log('this.newItems[j].id ', this.newItems[j].id);
 console.log('item.id', item.id);
          }
        }

        this.itemsString = JSON.stringify(this.items, null, '\t');
        this.listItemsService.initItems(this.items);
        this.paginatorUpdated = !this.paginatorUpdated;
        return;
      }
    }
  }


  private deleteItem(id: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        this.updateItems();
        break;
      }
    }
  }


  private saveJson(json: any) {
    this.items = json;
    this.updateItems();
  }


  // меняем класс, отображающий порядок сортировки
  private toggleClass(th: HTMLTableCellElement) {
    var cl = th.classList;

    if (this.thOld !== undefined && this.thOld !== th) {
      this.thOld.classList.remove('sort-asc');
      this.thOld.classList.remove('sort-desc');
    }
    this.thOld = th;

    if (cl.contains('sort-asc')) {
      cl.remove('sort-asc');
      cl.add('sort-desc');
    } else if (cl.contains('sort-desc')) {
      cl.remove('sort-desc');
      cl.add('sort-asc');
    } else {
      cl.add('sort-asc');
    }
  }


}
