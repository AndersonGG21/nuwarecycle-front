import { Component, OnInit } from '@angular/core';

export type Product = {
  name : string,
  img : string,
  price : number,
  description : string
}

export type NameKey = {
  name : string,
  key : string
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Product[] = [];
  selectedCategory: any = null;
  selectedPrice: NameKey = {
    name: '',
    key: ''
  };
  selectedBrands: NameKey[] = [];
  rangeValues: number[] = [20, 80];

  brands : NameKey[] = [
    { name: 'All', key: 'all' },
    { name: 'Apple', key: 'apple' },
    { name: 'Samsung', key: 'samsung' },
    { name: 'Huawei', key: 'huawei' },
    { name: 'Microsoft', key: 'microsoft' },
    { name: 'Lenovo', key: 'lenovo' },
    { name: 'Asus', key: 'asus' },
    { name: 'Dell', key: 'dell' }
  ]

    categories: any[] = [
        { name: 'All', key: 'all' },
        { name: 'Computers', key: 'computers' },
        { name: 'SmartPhones', key: 'smartphones' },
        { name: 'Headphones', key: 'headphone' },
        { name: 'Gaming Consoles', key: 'consoles' },
        { name: 'Cameras', key: 'cameras' },
        { name: 'TVs', key: 'tv' },
        { name: 'Smartwatches', key: 'smartwatch' }
    ];

    prices: NameKey[] = [
        { name: 'All', key: 'all' },
        { name: 'Under $50', key: 'under50'},
        { name: '$50 - $100', key: '50to100'},
        { name: '$100 - $150', key: '100to150'},
        { name: '$150 - $300', key: '150to300'},
        { name: '$300 - $500', key: '300to500'},  
        { name: '$500 - $1000', key: '500to1000'},
        { name: 'Over $1000', key: 'over1000'}
    ]

  layout: string = 'list';

  ngOnInit(): void {
    this.products = [{name : "Producto 1", img : "https://via.placeholder.com/150", price : 100, description : "Descripcion del producto 1"}, {name : "Producto 2", img : "https://via.placeholder.com/150", price : 200, description : "Descripcion del producto 2"},  {name : "Producto 3", img : "https://via.placeholder.com/150", price : 300, description : 'No'}, {name : "Producto 4", img : "https://via.placeholder.com/150", price : 400, description : 'No'}, {name : "Producto 5", img : "https://via.placeholder.com/150", price : 500, description : 'No'}];

    this.selectedCategory = this.categories[0];
  }

  changeLayout() {
    this.layout = this.layout === 'list' ? 'grid' : 'list';    
  }
}
