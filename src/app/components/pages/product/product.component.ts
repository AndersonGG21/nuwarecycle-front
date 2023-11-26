import { AfterViewChecked, Component, Input, OnInit, inject } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  images: any[] | undefined;
  cartService = inject(ShoppingCartService);
  product: Product = {
    idProd: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    brand: '',
    rating: 0
  };  
  @Input() name? : string;
  private productService = inject(ProductsServiceService);

  ngOnInit(): void {
    this.productService.getProductByName(this.name!).subscribe((res) => {
      this.product = res;    
      this.images = [
        this.product.image1,
        this.product.image2,
        this.product.image3,
        this.product.image4
     ]  
    })
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }
}
