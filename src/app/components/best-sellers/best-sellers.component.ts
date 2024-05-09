import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css'],
})
export class BestSellersComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  products: Product[] = [];
  private cartService = inject(ShoppingCartService);
  private productService = inject(ProductsServiceService);
  private cookie = inject(CookieService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  @Input() title = '';

  ngOnInit() {
    
    this.products = this.productService.getProductsJson();

    for (let i = this.products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.products[i], this.products[j]] = [
        this.products[j],
        this.products[i],
      ];
    }

    this.products = this.products.slice(0, 6);

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

  likeProduct(product: Product) {
    const liked = {
      product: {
        idProd: product.idProd,
      },
      user: {
        id: Number(this.cookie.get('uid')),
      },
    };

    this.productService.likeProduct(liked).subscribe((response) => {
      this.alertService.success('Product added to your wishlist');
    });
  }

  redirectToProduct(product: Product): void {
    const productName = product?.name;
    this.router.navigate([`/product/${productName}`]).then(() => {
      location.reload();
    });
  }
}
