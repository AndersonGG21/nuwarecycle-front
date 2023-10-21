import { Component, OnInit } from '@angular/core';

export type Product = {
  name : string,
  img : string,
  price : number,
  description : string
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Product[] = []
  layout: string = 'list';

  ngOnInit(): void {
    this.products = [{name : "Producto 1", img : "https://via.placeholder.com/150", price : 100, description : "Descripcion del producto 1"}, {name : "Producto 2", img : "https://via.placeholder.com/150", price : 200, description : "Descripcion del producto 2"},  {name : "Producto 3", img : "https://via.placeholder.com/150", price : 300, description : 'No'}, {name : "Producto 4", img : "https://via.placeholder.com/150", price : 400, description : 'No'}, {name : "Producto 5", img : "https://via.placeholder.com/150", price : 500, description : 'No'}]
  }

  changeLayout() {
    this.layout = this.layout === 'list' ? 'grid' : 'list';    
  }
}
