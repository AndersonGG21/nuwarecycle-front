import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit{
  responsiveOptions: any[] | undefined;
  products : Product[] = [];
  private cartService = inject(ShoppingCartService);
  private productService = inject(ProductsServiceService);  
  private cookie = inject(CookieService);
  private alertService = inject(AlertService);

  ngOnInit() {

    this.productService.getRadnomProducts().subscribe((products) => {
      this.products = products;
    }) 
                
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

  addProduct(product: Product) {
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
