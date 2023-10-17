import { Component, OnInit } from '@angular/core';
export interface Product {
  name : string,
  img : string,
  price : number,
  description : string
}

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit{
  responsiveOptions: any[] | undefined;
  products : Product[] = [];

  ngOnInit() {

    this.products = [{name : "Producto 1", img : "https://via.placeholder.com/150", price : 100, description : "Descripcion del producto 1"}, {name : "Producto 2", img : "https://via.placeholder.com/150", price : 200, description : "Descripcion del producto 2"},  {name : "Producto 3", img : "https://via.placeholder.com/150", price : 300, description : 'No'}, {name : "Producto 4", img : "https://via.placeholder.com/150", price : 400, description : 'No'}, {name : "Producto 5", img : "https://via.placeholder.com/150", price : 500, description : 'No'}]
      
    
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }  
}
