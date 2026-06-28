import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list';
import { CartComponent } from './pages/cart/cart';
import { Home } from './pages/home/home';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: Home
},
{
    path: 'product',
    component: ProductsListComponent
},
{
    path: 'cart',
    component: CartComponent
}
];
