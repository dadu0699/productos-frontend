import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  public titulo: string;

  constructor() {
    this.titulo = 'Página no encontrada';
  }

  ngOnInit() {
  }
}
