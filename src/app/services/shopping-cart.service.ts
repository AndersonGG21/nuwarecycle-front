import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { AlertService } from './alert.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  brand: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor() {}

  private cartLength : Subject<string> = new Subject<string>();
  private alertService = inject(AlertService);
  cartProducts: Product[] = [];

  
  addToCart(product: Product) {
    
    const index = this.cartProducts.findIndex((prod) => prod.name === product.name);
    if (index !== -1) {
      this.cartProducts[index].stock += 1;          
    }else {
      this.cartProducts.push(product);
    }
    this.cartLength.next(this.cartProducts.length.toString());
    this.alertService.success('Product added to your cart')
  }

  
  getCartProducts() {
    return this.cartProducts;
  }

  
  deleteProduct(product: Product) {
    const index = this.cartProducts.indexOf(product);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
    }
  }

  getCartLenght() : Observable<string>{
    return this.cartLength.asObservable();
  }

  updateValue(newValue: string) {
    this.cartLength.next(newValue);
  }

  deleteProductById(id: number) {
    const index = this.cartProducts.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
    }
  }

}
