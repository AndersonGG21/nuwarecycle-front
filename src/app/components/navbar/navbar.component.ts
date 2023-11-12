import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  items: any[] = [];
  productAmount : number = 0;
  menuItems: MenuItem[] | undefined;
  selectedItem: any = {};
  suggestions: any[] = [];
  sidebarVisible: boolean = false;
  visible: boolean = false;
  loginVisible: boolean = false;
  private cartService = inject(ShoppingCartService);
  badge$ = '0';
  shoppingCartProducts: Product[] = [];    

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        escape: false,
        command: () => {
          this.loginVisible = true;
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          
        }
      },
    ];

    this.cartService.getCartLenght().subscribe((res) => {
      this.badge$ = res.toString();      
    })

    this.shoppingCartProducts = this.cartService.getCartProducts();
  }

  showDialog() {
    this.visible = true;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(
      (item) => event.query + '-' + item
    );
    console.log(this.selectedItem);
  }

  deleteProduct(id: number) {
    this.cartService.deleteProductById(id);
  }
}
