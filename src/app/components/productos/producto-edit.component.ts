import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productedit',
  templateUrl: 'producto-form.component.html'
})
export class ProductoEditComponent implements OnInit {
  public titulo: string;
  public productoID: number;
  public producto: Producto;
  public filesToUpload: any;
  public resultUpload: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Editar Producto';
    this.producto = new Producto(0, '', '', 0, '');
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => { this.productoID = params['id']; });
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

  onSubmit() {
    if (this.filesToUpload && this.filesToUpload.length >= 1) {
      this._productoService.makeFileRequest([], this.filesToUpload)
        .then(
        (result) => {
          this.resultUpload = result;
          this.producto.imagen = this.resultUpload.filename;
          this.editProducto();
        },
        (error) => {
          console.log(error);
        }
        );
    } else {
      this.editProducto();
    }
  }

  editProducto() {
    this._productoService.editProducto(this.productoID, this.producto)
      .subscribe(
      response => {
        if (response.code === 200) {
          this._router.navigate(['/producto', this.productoID]);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
      );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
