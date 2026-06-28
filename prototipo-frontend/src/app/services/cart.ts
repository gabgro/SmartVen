import { Injectable , signal} from '@angular/core';
import { Product } from '../Modules/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cart = signal<Product[]> ([]);

  addToCart(product: Product){
    this.cart.set([...this.cart(), product])
  }

  removeFromCart(id:number){
    this.cart.set(this.cart().filter((p)=>p.id !== id));
  }

  clearCart(){
    this.cart.set([])
  }
}
