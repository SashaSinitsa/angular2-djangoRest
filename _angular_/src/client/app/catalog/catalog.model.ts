
export interface IItem {
  id: number;
  number: string;
  manufacturer: string;
  title: string;
  unit: string;
  price: string;
  presence: string;
  // shown: string;
}

export class Item implements IItem {
  constructor(
    public id: number,
    public number: string,
    public manufacturer: string,
    public title: string,
    public presence: string,
    public unit: string,
    public price: string
    // public shown: string
  ) { }
};


export interface IHeadTable {
  name: string;
  title: string;
  width: number;
}

export class HeadTable {
  itemsHead: IHeadTable[];
  constructor() {
    this.itemsHead = [
      {name:'id',           title:'Id',            width: 3},
      {name:'number',       title:'Каталожный №',  width: 10},
      {name:'manufacturer', title:'Производитель', width: 10},
      {name:'title',        title:'Название',      width: 25},
      {name:'presence',     title:'Наличие',       width: 5},
      {name:'unit',         title:'Еденицы изм.',  width: 5},
      {name:'price',        title:'Цена',          width: 5}
      // {name:'shown',        title:'Актуальность',  width: 10}
    ];
  }
}


