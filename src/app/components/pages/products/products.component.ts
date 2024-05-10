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
  nameTitle: string = 'Todos los articulos'
  @Input() category?: string;
  private router = inject(Router);
  private cartService = inject(ShoppingCartService);
  private productService = inject(ProductsServiceService);
  private cookie = inject(CookieService);
  private alertService = inject(AlertService);
  layout: string = 'list';
  



  categories: string[] = [
    'todo', 
    'cultura', 
    'deportiva', 
    'bodega y servicios',
    'gifs',
    'tecnologia'
  ];

  prices: PriceRange[] = [
    { name: 'Hasta $10000', key: 'min', min: 0 ,max: 10000},
    { name: '10.000 a $80.000', key: 'medium', min: 10000, max: 80000},
    { name: 'Mas de $80.000', key: 'max', min: 80000, max: 100000000 },
  ];

  helps: string[] = [
    '¿Necesitas Ayuda?',
    '¿Como Puedo Comprar?', 
    '¿Metodo de Pago?', 
    '¿Problemas Con el Envio?', 
    'Terminos y Condiciones'
  ]
Math: any;
categoryName: any;
  

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

  formatNumber(price: number): string {
    return Math.floor(price).toLocaleString('es-CO');
  }

  getProductsByCategorySura(category: string) {
    this.nameTitle = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    if (category === 'todo') {
      this.filteredProducts = this.products;
    
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
  }
}

filterProductsByPrice(priceRange: PriceRange): void {
  this.nameTitle = priceRange.name.charAt(0).toUpperCase() + priceRange.name.slice(1).toLowerCase();
  this.filteredProducts = this.products.filter(product =>
    product.price >= priceRange.min && product.price <= priceRange.max
  );
}


}