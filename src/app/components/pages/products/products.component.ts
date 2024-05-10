import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

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
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  selectedCategory: any = null;
  selectedPrice: any;
  selectedBrands: string[] = [];
  rangeValues: number[] = [0, 50];
  @Input() category?: string;
  private router = inject(Router);
  private cartService = inject(ShoppingCartService);
  private productService = inject(ProductsServiceService);
  private cookie = inject(CookieService);
  private alertService = inject(AlertService);
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
    'Sony',
    'Cannon',
    'Nintendo',
    'Google',
    'LG'
  ];

  categories: any[] = [
    {
      name: 'Todos',
      value: 'All'
    },
    {
      name: 'Ropa',
      value: 'Computers'
    },
    {
      name: 'Celulares',
      value: 'SmartPhones'
    },
    {
      name: 'Audifonos',
      value: 'Headphones'
    },
    {
      name: 'Consolas',
      value: 'Gaming Consoles'
    },
    {
      name: 'Camaras',
      value: 'Cameras'
    },
    {
      name: 'Cultural',
      value: 'Televisions'
    },
    {
      name: 'Tecnologia Vestible',
      value: 'Wearable Tech'
    },
    {
      name: 'Laptops',
      value: 'Laptops'
    },
    {
      name: 'Bocinas',
      value: 'Speakers'
    },
    {
      name: 'Hogar Inteligente',
      value: 'Smart Home'
    }   
  ];

  prices: PriceRange[] = [
    { name: 'Todos', key: 'all', min: 0 ,max: 100000},
    { name: 'Menos de $50', key: 'under50', min: 0, max: 50},
    { name: '$50 - $100', key: '50to100', min: 50, max: 100 },
    { name: '$100 - $150', key: '100to150', min: 100, max: 150 },
    { name: '$150 - $300', key: '150to300', min: 150, max: 300 },
    { name: '$300 - $500', key: '300to500', min: 300, max: 500 },
    { name: '$500 - $1000', key: '500to1000', min: 500, max: 1000 },
    { name: 'Over $1000', key: 'over1000', min: 1000, max: 100000 },
  ];
  

  ngOnInit(): void {    

    this.products = this.productService.getProductsJson();
    this.filteredProducts  = this.products;

    if (!this.category) {
      this.selectedCategory = this.categories[0]
    }else{
      this.selectedCategory = this.category;      
      this.filteredProducts = this.products.filter((product) => product.category === this.category);            
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category && this.category != 'All') {      
      this.filteredProducts = this.products.filter((product) => product.category === this.category);
    } else {
      this.filteredProducts = this.products;
    }    
  }

  changeLayout() {
    this.layout = this.layout === 'list' ? 'grid' : 'list';
  }

  getProductsByCategory(string: string) {
    let queryParams: Params = {};
    if (string != 'all') {
      queryParams['category'] = string;
    }

    this.router.navigate(['/products'], { queryParams });
  }

  getProductsBetweenPrices(price : PriceRange) {
    this.filteredProducts = this.allProducts;
    let {min, max} = price;
    if (min == 0 && max == 100000) {
      this.filteredProducts = this.allProducts;
    } else {      
      this.filteredProducts = this.products.filter((product) => product.price >= min && product.price <= max);
    }    
  }

  getProductsBetweenRange(min : number, max : number) {
    this.filteredProducts = this.allProducts;
    min = min * 1000;
    max = max * 1000;
    if (min == 0 && max == 100000) {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.products.filter((product) => product.price >= min && product.price <= max);
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

  likeProduct(product : Product) {
    const liked = {
      product : {
        idProd: product.idProd
      },
      user : {
        id: Number(this.cookie.get('uid'))
      }
    }
    
    this.productService.likeProduct(liked).subscribe((response) => {
      this.alertService.success('Product added to your wishlist');
    });
  }
}
