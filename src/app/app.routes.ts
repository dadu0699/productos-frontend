import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ErrorComponent } from './components/error/error.component';
import { ProductosListComponent } from './components/productos/productos-list.component';
import { ProductoAddComponent } from './components/productos/producto-add.component';
import { ProductoDetailComponent } from './components/productos/producto-detail.component';
import { ProductoEditComponent } from './components/productos/producto-edit.component';

const appRoutes: Routes = [
  { path: 'home', component: ProductosListComponent },
  { path: 'crear-producto', component: ProductoAddComponent },
  { path: 'producto/:id', component: ProductoDetailComponent },
  { path: 'editar-producto/:id', component: ProductoEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
