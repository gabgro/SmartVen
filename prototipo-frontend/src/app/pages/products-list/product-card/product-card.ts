import { Component,input } from '@angular/core';
import { Product } from '../../../Modules/products.model';
import { PrimaryButton } from "../../../components/primary-button/primary-button";

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
