import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card';

describe('ProductCard', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    fixture.componentRef.setInput('product', {
      id:4,
      title: 'Coca Cola 350 ml',
      price: 5.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36sMgVakFA-E3GEl5x36h76y_F4z9QL1BXC8hAe-1nlFMhN-S5uzvL8Y&s=10',
      stock: 7,
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
