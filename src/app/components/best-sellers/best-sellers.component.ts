import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit() {

    //Make this products Partial<Product[]> = []; an array of products
    this.products = [
      {
        id: 1,
        name: "Product 1",
        description: "This is the description of Product 1",
        price: 10.99,
        image: "https://example.com/image1.jpg",
        category: "Category 1",
        stock: 20,
        image1: "https://example.com/image1.jpg",
        image2: "https://example.com/image2.jpg",
        image3: "https://example.com/image3.jpg",
        image4: "https://example.com/image4.jpg",
        brand: "Brand 1",
        rating: 4.5
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is the description of Product 2",
        price: 19.99,
        image: "https://example.com/image2.jpg",
        category: "Category 2",
        stock: 15,
        image1: "https://example.com/image1.jpg",
        image2: "https://example.com/image2.jpg",
        image3: "https://example.com/image3.jpg",
        image4: "https://example.com/image4.jpg",
        brand: "Brand 2",
        rating: 3.8
      },
      {
        id: 3,
        name: "Product 3",
        description: "This is the description of Product 3",
        price: 7.99,
        image: "https://example.com/image3.jpg",
        category: "Category 1",
        stock: 10,
        image1: "https://example.com/image1.jpg",
        image2: "https://example.com/image2.jpg",
        image3: "https://example.com/image3.jpg",
        image4: "https://example.com/image4.jpg",
        brand: "Brand 1",
        rating: 4.2
      },      
    ];
    
            
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
}
