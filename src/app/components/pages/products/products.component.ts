import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

export type NameKey = {
  name: string;
  key: string;
};

type PriceRange = {
  name: string;
  key: string;
  min: number;
  max: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  products: Product[] = [];
  allProducts: Product[] = [];
  selectedCategory: any = null;
  selectedPrice: any;
  selectedBrands: string[] = [];
  rangeValues: number[] = [0, 50];
  @Input() category?: string;
  private router = inject(Router);
  private cartService = inject(ShoppingCartService);
  private productService = inject(ProductsServiceService);
  layout: string = 'list';

  brands: string[] = [
    'All',
    'Apple',
    'Samsung',
    'Huawei',
    'Microsoft',
    'Lenovo',
    'Asus',
    'Dell',
  ];

  categories: any[] = [
    { name: 'All', key: 'all' },
    { name: 'Computers', key: 'computers' },
    { name: 'SmartPhones', key: 'smartphones' },
    { name: 'Headphones', key: 'headphone' },
    { name: 'Gaming Consoles', key: 'consoles' },
    { name: 'Cameras', key: 'cameras' },
    { name: 'TVs', key: 'tv' },
    { name: 'Smartwatches', key: 'smartwatch' },
  ];

  prices: PriceRange[] = [
    { name: 'All', key: 'all', min: 0 ,max: 100000},
    { name: 'Under $50', key: 'under50', min: 0, max: 50},
    { name: '$50 - $100', key: '50to100', min: 50, max: 100 },
    { name: '$100 - $150', key: '100to150', min: 100, max: 150 },
    { name: '$150 - $300', key: '150to300', min: 150, max: 300 },
    { name: '$300 - $500', key: '300to500', min: 300, max: 500 },
    { name: '$500 - $1000', key: '500to1000', min: 500, max: 1000 },
    { name: 'Over $1000', key: 'over1000', min: 1000, max: 100000 },
  ];
  

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.allProducts = products;
    })

    this.selectedCategory = this.categories[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category && this.category != 'all') {
      this.products = this.products.filter(
        (product) => product.description == 'No'
      );
    } else {
      this.products = this.products.filter(
        (product) => product.description != ''
      );
    }    
  }

  changeLayout() {
    this.layout = this.layout === 'list' ? 'grid' : 'list';
  }

  getCategory(string: string) {
    let queryParams: Params = {};
    if (string != 'all') {
      queryParams['category'] = string;
    }

    this.router.navigate(['/products'], { queryParams });
  }

  getProductsBetweenPrices(price : PriceRange) {
    let {min, max} = price;
    if (min == 0 && max == 100000) {
      this.products = this.allProducts;
    } else {
      this.productService.getProductsBetweenPrices(min, max).subscribe((products) => {
        this.products = products;           
      });
    }    
  }

  getProductsBetweenRange(min : number, max : number) {
    min = min * 1000;
    max = max * 1000;
    if (min == 0 && max == 100000) {
      this.products = this.allProducts;
    } else {
      this.productService.getProductsBetweenPrices(min, max).subscribe((products) => {
        this.products = products;           
      });
    }    
  }

  getProductsByBrands() {
    if (this.selectedBrands.length != 0) {
      if (this.selectedBrands.includes('All')) {
        this.products = this.allProducts;
      } else {
        this.productService.getProductsByBrands(this.selectedBrands).subscribe((products) => {
          this.products = products;
          console.log(products);
        });
      }  
    }else {
      this.products = this.allProducts;
    }    
  }

  addProduct(product : Product) {
    this.cartService.addToCart(product);
  }
}
