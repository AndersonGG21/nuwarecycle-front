import { Injectable } from '@angular/core';

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

  //Create an empty list of products
  cartProducts: Product[] = [];

  //Add product to the list
  addToCart(product: Product) {
    this.cartProducts.push(product);
    console.log(product);
    console.log(this.cartProducts);
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
}
