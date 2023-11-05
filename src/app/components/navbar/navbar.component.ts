import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
  private cartService = inject(ShoppingCartService);
  badge$ = '0';
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Login',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path><path d="M3 12h13l-3 -3"></path><path d="M13 15l3 -3"></path></svg>',
        escape: false,
        // command: () => {
        //     this.update();
        // }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        // command: () => {
        //     this.delete();
        // }
      },
    ];

    this.cartService.getCartLenght().subscribe((res) => {
      this.badge$ = res.toString();
      this.cdr.detectChanges();
    })
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
}
