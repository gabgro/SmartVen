import { Component, input, inject} from '@angular/core';
import { Product } from '../../../Modules/products.model';
import { Button } from "../../../components/button/button";
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-cart-item',
  imports: [Button],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItemComponent {

  cartServ = inject(CartService);
  item = input.required<Product>();
}
