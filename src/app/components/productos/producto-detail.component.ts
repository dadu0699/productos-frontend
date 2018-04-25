import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productodetail',
  templateUrl: 'producto-detail.component.html'
})
export class ProductoDetailComponent implements OnInit {
  public productoID: number;
  public producto: Producto;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productoService: ProductoService
  ) {
    this._activatedRoute.params.subscribe(params => { this.productoID = params['id']; });
  }

  ngOnInit() {
    this.getProducto();
  }

  getProducto() {
    this._productoService.getProducto(this.productoID)
      .subscribe(
      response => {
        if (response.code === 200) {
          this.producto = response.data;
        } else {
          console.log(response);
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(<any>error);
      }
      );
  }
}
