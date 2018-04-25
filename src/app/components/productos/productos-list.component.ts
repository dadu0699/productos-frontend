import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productoslist',
  templateUrl: './productos-list.component.html'
})
export class ProductosListComponent implements OnInit {
  public titulo: string;
  public productos: Producto[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Productos';
  }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos()
      .subscribe(
      response => {
        if (response.code !== 200) {
          console.log(response);
        } else {
          this.productos = response.data;
        }
      },
      error => {
        console.log(<any>error);
      });
  }

  onDeleteProducto(id: number) {
    this._productoService.deleteProducto(id)
      .subscribe(
      response => {
        if (response.code === 200) {
          this.getProductos();
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
      );
  }
}
