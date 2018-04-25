import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productoadd',
  templateUrl: 'producto-form.component.html'
})
export class ProductoAddComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public filesToUpload: any;
  public resultUpload: any;

  constructor(
    private _router: Router,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Crear Producto';
    this.producto = new Producto(0, '', '', 0, '');
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.filesToUpload && this.filesToUpload.length >= 1) {
      this._productoService.makeFileRequest([], this.filesToUpload)
        .then(
        (result) => {
          this.resultUpload = result;
          this.producto.imagen = this.resultUpload.filename;
          this.saveProducto();
        },
        (error) => {
          console.log(error);
        }
        );
    } else {
      this.saveProducto();
    }
  }

  saveProducto() {
    this._productoService.addProducto(this.producto)
      .subscribe(
      response => {
        if (response.code === 200) {
          this._router.navigate(['/home']);
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
