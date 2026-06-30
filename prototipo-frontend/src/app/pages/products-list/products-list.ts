import { Component, signal } from '@angular/core';
import { Product } from '../../Modules/products.model';
import { ProductCardComponent } from "./product-card/product-card";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsListComponent {

  //Exemplo para pegar os dados da api, poderia ter usado cliente http também e rxjs e observables
  /* async ngOnInit(){
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data)
  }
  */
  products = signal<Product[]>([ 
    {
    id: 1,
      title: 'Hamburguer',
      price: 31.95,
      image: 'https://img.magnific.com/fotos-gratis/hamburguer-de-queijo-classico-com-costeleta-de-carne-legumes-e-cebola-isolados-em-um-fundo-branco_123827-29709.jpg?semt=ais_hybrid&w=740&q=80',
      stock: 10,
    },
    {
      id: 2,
      title: 'Porção de Batata Frita',
      price: 26.3,
      image:
        'https://sachefmio.blob.core.windows.net/fotos/batata-frita-por%C3%A7%C3%A3o-b1d9fb3b-475e-4c98-9e6e-fc624b1c252c.jpg',
      stock: 0,
    },
    {
      id: 3,
      title: 'Pizza Calabresa',
      price: 51.99,

      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_AXeJBetG_rsulZG5uDUKA04D_xyJdUaKQGiSVeyuA&s=10',
      stock: 5,
    },
    {
      id: 4,
      title: 'Coca Cola 350 ml',
      price: 5.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36sMgVakFA-E3GEl5x36h76y_F4z9QL1BXC8hAe-1nlFMhN-S5uzvL8Y&s=10',
      stock: 7,
    },
  ])
}
