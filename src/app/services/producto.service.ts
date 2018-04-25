import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Producto } from '../models/producto';
import { Global } from '../services/global';

@Injectable()
export class ProductoService {
  public url: string;

  constructor(private _http: Http) {
    this.url = Global.url;
  }

  getProductos() {
    return this._http.get(this.url + 'productos')
      .map(res => res.json());
  }

  getProducto(id: number) {
    return this._http.get(this.url + 'producto/' + id)
      .map(res => res.json());
  }

  addProducto(producto: Producto) {
    const json = JSON.stringify(producto);
    const params = 'json=' + json;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'productos', params, { headers: headers })
      .map(res => res.json());
  }

  editProducto(id: number, producto: Producto) {
    const json = JSON.stringify(producto);
    const params = 'json=' + json;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'update-producto/' + id, params, { headers: headers })
      .map(res => res.json());
  }

  deleteProducto(id: number) {
    return this._http.get(this.url + 'delete-producto/' + id)
      .map(res => res.json());
  }

  makeFileRequest(parms: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url + 'upload-file', true);
      xhr.send(formData);
    });
  }
}
