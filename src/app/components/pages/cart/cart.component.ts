import { Component, OnInit, inject } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
  
  productAmount = 0;
  products : Product[] = [];
  private cartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.products = this.cartService.getCartProducts();
  }
  
  getTotal(){
    let total = 0;
    this.products.forEach(product => {
      total += product.price * product.stock;
    });
    return total;
  }

  //Crea una funcion que remueve un producto del carrito  y lo elimina de la lista de productos
  removeProduct(product: Product){
    this.cartService.deleteProduct(product);
    this.products = this.cartService.getCartProducts();
  }
  



}
