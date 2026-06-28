import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart';
import { PrimaryButton } from "../../../components/primary-button/primary-button";

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButton],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummaryComponent {

  cartServ = inject(CartService)
  total = computed(() => {
    let total = 0;
    for(const item of this.cartServ.cart()){
      total+= item.price;
    }
    return total;
  })
}
