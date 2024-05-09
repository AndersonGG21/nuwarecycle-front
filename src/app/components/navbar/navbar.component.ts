import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AlertService } from 'src/app/services/alert.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { MediaService } from 'src/app/services/media.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: any[] = [];
  menuItems: MenuItem[] | undefined;
  selectedProduct: Product = {
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
  sidebarVisible: boolean = false;
  likedVisible: boolean = false;
  visible: boolean = false;
  loginVisible: boolean = false;
  private cartService = inject(ShoppingCartService);
  badge$ = '0';
  filteredProds: Product[] = [];
  shoppingCartProducts: Product[] = [];
  likedProducts: Product[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  credentials: FormGroup = this.fb.group({});
  newUser: FormGroup = this.fb.group({});
  private loginService = inject(LoginServiceService);
  private productService = inject(ProductsServiceService);
  private router = inject(Router);
  alertService = inject(AlertService);
  cookie = inject(CookieService);
  logedIn = this.cookie.get('Bearer') != '';
  isAdmin = this.loginService.isAdmid();
  register = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImg = '';
  previewImg = '';
  private mediaService = inject(MediaService);
  userFormData = new FormData();

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  ngOnInit(): void {
    if (this.logedIn) {
      this.menuItems = [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          escape: false,
          command: () => {this.logout()},
        },
      ];
    } else {
      this.menuItems = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          escape: false,
          command: () => {
            this.loginVisible = true;
          },
        },
      ];
    }

    this.productService.getAllProducts().subscribe((res) => {
      this.filteredProds = res;
    });

    this.credentials = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.newUser = this.fb.group({
      username: ['', [Validators.required]],
      userMail: ['', [Validators.email, Validators.required]],
      userPass: ['', [Validators.required]],
    });

    this.cartService.getCartLenght().subscribe((res) => {
      this.badge$ = res.toString();
    });

    this.shoppingCartProducts = this.cartService.getCartProducts();
  }

  showDialog() {
    this.visible = true;
  }

  deleteProduct(id: number) {
    this.cartService.deleteProductById(id);
  }

  submit() {
    this.loginService.login(
      this.credentials.value.email,
      this.credentials.value.password
    );
    this.loginVisible = false;
    this.alertService.success('You have been logged in');
    setTimeout(() => {
      window.location.reload();
    }, 3100);
  }

  createUser() {
    const role = 'USER';
    console.log(this.userFormData);
    this.mediaService.uploadFile(this.userFormData).subscribe(
      (res) => {
        this.profileImg = res.url;
      },
      (error) => {
        this.alertService.success('Error uploading image');
      },
      () => {
        this.loginService
          .createUser(
            this.newUser.value.username,
            this.newUser.value.userMail,
            this.newUser.value.userPass,
            this.profileImg,
            role
          )
          .subscribe((res) => {
            this.alertService.success('You have been registered, please login');
            this.register = false;
          });
      }
    );
  }

  filterProducts(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.filteredProds as any[]).length; i++) {
      let product = (this.filteredProds as any[])[i];
      if (product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product);
      }
    }

    this.filteredProds = filtered;
  }

  redirectToProduct(): void {
    const productName = this.selectedProduct?.name;
    this.router.navigate([`/product/${productName}`]);
  }

  showLikedModal() {
    this.likedVisible = true;
    this.productService.getLikedProducts().subscribe((res) => {
      this.likedProducts = res;
      console.log(this.likedProducts);
    });
  }

  redirectToLikedProduct(product: Product): void {
    const productName = product?.name;
    this.likedVisible = false;
    this.router.navigate([`/product/${productName}`]).then(() => {
      location.reload();
    });
  }

  handleFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.userFormData.append('file', files[0]);
      this.alertService.success('Image uploaded successfully');
      const reader = new FileReader();
      reader.onload = (e) => (this.previewImg = e.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  }

  logout() {
    this.cookie.deleteAll();
    this.alertService.success('You have been logged out');
    setTimeout(() => {
      this.router.navigate(['/home']).then(() => {
        location.reload();
      });
    }, 1000);
  }

  redirectT(route : string){
    this.router.navigate([`/${route}`])
  }
}
