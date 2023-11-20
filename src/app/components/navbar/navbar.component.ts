import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { LoginServiceService } from 'src/app/services/login-service.service';
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
    id: 0,
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
  visible: boolean = false;
  loginVisible: boolean = false;
  private cartService = inject(ShoppingCartService);
  badge$ = '0';
  filteredProds: Product[] = [];
  shoppingCartProducts: Product[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  credentials: FormGroup = this.fb.group({});
  private loginService = inject(LoginServiceService);
  private productService = inject(ProductsServiceService);
  private router = inject(Router);

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        escape: false,
        command: () => {
          this.loginVisible = true;
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {},
      },
    ];

    this.productService.getAllProducts().subscribe((res) => {
      this.filteredProds = res;
    });

    this.credentials = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
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

  redirectToProduct() : void {
    const productName = this.selectedProduct?.name
    this.router.navigate([`/product/${productName}`])
  }
}
