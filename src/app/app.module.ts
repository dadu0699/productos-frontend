import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Routes
import { appRouting, appRoutingProviders } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductosListComponent } from './components/productos/productos-list.component';
import { ProductoAddComponent } from './components/productos/producto-add.component';
import { ProductoDetailComponent } from './components/productos/producto-detail.component';
import { ProductoEditComponent } from './components/productos/producto-edit.component';

// Services
import { ProductoService } from './services/producto.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductosListComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRouting
  ],
  providers: [
    appRoutingProviders,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
