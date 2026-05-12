import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { ProductsListComponent } from './pages/products-list/products-list';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ProductsListComponent],
  template: ` <app-header></ app-header> <app-products-list></ app-products-list>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecomm');
}
