import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Comment, Product } from 'src/app/type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
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
    rating: 0,
  };
  @Input() name?: string;
  comment: string = '';
  comments: Comment[] = [];
  relatedProducts: Product[] = [];
  responsiveOptions : any[] = [];
  private alertService = inject(AlertService);
  private productService = inject(ProductsServiceService);
  private cookie = inject(CookieService);

  ngOnInit(): void {
    // this.productService.getProductByName(this.name!).subscribe((res) => {
    //   this.product = res;
    //   this.images = [
    //     this.product.image1,
    //     this.product.image2,
    //     this.product.image3,
    //     this.product.image4,
    //   ];

    //   this.productService
    //     .getProductComments(this.product.idProd!)
    //     .subscribe((comments) => {
    //       this.comments = comments;
    //       console.log(this.comments);
    //     });
    // });

    const products : Product[] = this.productService.getProductsJson();
    
    const product = products.find((product) => product.name === this.name);
    
    if (product) {      
      this.product = product;
      this.images = [
        this.product.image1,
        this.product.image2,
        this.product.image3,
        this.product.image4,
      ];
    } else {      
      console.error(`No se encontró el producto con el nombre ${this.name}`);
    }
    

    
    // this.productService.getRadnomProducts().subscribe((res) => {
    //   this.relatedProducts = res;
    // })

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

  commentProduct() {
    const userId = this.cookie.get('uid');
    const comment: Comment = {
      comment: this.comment,
      product: {
        idProd: this.product.idProd,
      },
      user: {
        id: Number(userId),
      },
    };

    this.productService
      .commentProduct(comment.product.idProd, comment)
      .subscribe((res) => {
        comment.user.profileImg = this.cookie.get('profileImg');
        this.comments.push(comment);
        this.alertService.success('Comment added successfully');
      });
  }
}
