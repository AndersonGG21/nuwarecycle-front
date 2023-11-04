import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

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


  //Create an empty list of products
  cartProducts: Product[] = [];

  //Add product to the list
  addToCart(product: Product) {
    this.cartProducts.push(product);
    this.cartLength.next(this.cartProducts.length.toString());
  }

  //Get the list of products
  getCartProducts() {
    return this.cartProducts;
  }

  //delete product from the list
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

}
