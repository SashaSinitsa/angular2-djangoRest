
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IItem } from './catalog.model';

// import * as saveAs from 'file-saver';
let saveAs = require('file-saver/FileSaver.js');


@Injectable()
export class ListItemsService {

  items: IItem[];
  // apiUrl = 'http://sinitsa.myftp.org/api/spare-parts';
  apiUrl = 'http://localhost:8000/api/spare-parts';
  public pending = false;

  constructor(private http: Http) { }


  getItems(): Promise<IItem[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  initItems(items: IItem[]) {
    this.items = items;
  }


  addItem(item: IItem): Promise<IItem> {
    let id = 0;
    let arr: number[] = [];

    // создаем массив  существующих id
    for (let i = 0; i < (<any>this.items).length; i++) {
      arr.push(this.items[i].id);
    }
    // ищем минимальный отсутствующий id
    target: for (let j = 1; j < 300; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (j === arr[i]) {
          continue target;
        }
      }
      id = j;
      break;
    }
    // POST-запрос с нашим id
    item.id = id;
    return this.post(item);
  }


  editItem(item: IItem): Promise<IItem> {
    return this.put(item);
  }


  jsonSave(json: any): Promise<IItem[]> {
    return this.postJson(json);
  }


  deleteItem(id: number): Promise<number> {
    return this.delete(id);
  }


  getFile(name: string) {
    this.download(name);
  }


  public download(name: string) {
    //  import 'filesaver.js' in index.html);

    // Xhr creates new context so we need to create reference to this
    let self = this;

    // Status flag used in the template.
    this.pending = true;

    let xhr = new XMLHttpRequest();
    // let url =  `/csv/${}?lang=en`;
    let url = this.apiUrl + `/csv/download`;
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    // Xhr callback when we get a result back
    // We are not using arrow function because we need the 'this' context
    xhr.onreadystatechange = function () {

      // We use setTimeout to trigger change detection in Zones
      setTimeout(() => { self.pending = false; }, 0);

      // If we get an HTTP status OK (200), save the file using fileSaver
      if (xhr.readyState === 4 && xhr.status === 200) {
        var blob = new Blob([this.response], { type: 'application/json' });
        (<any> saveAs)(blob, name + '.json');
      }
    };

    // Start the Ajax request
    xhr.send();
  }


  private postJson(json: IItem[]): Promise<IItem[]> {
    let body = JSON.stringify(json);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(this.apiUrl + `/json`, body, options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private post(item: IItem): Promise<IItem> {
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(this.apiUrl, body, options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private put(item: IItem): Promise<IItem> {
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    let url = `${this.apiUrl}/${item.id}`;

    return this.http.put(url, body, options)
      .toPromise()
      .then(res => item)
      .catch(this.handleError);
  }


  private delete(id: number): Promise<number> {
    let url = `${this.apiUrl}/${id}`;

    return this.http.delete(url)
      .toPromise()
      .then(res => +id)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.log('Произошла ошибка', error);
    return Promise.reject(error.message || error);
  }


}
