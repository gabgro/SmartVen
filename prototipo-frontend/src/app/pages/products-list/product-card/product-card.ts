import { Component,inject,input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../Modules/products.model';
import { PrimaryButton } from "../../../components/primary-button/primary-button";
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButton, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  cartServ = inject(CartService);
}
