import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  brand: string;
  rating: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  images: string[] = [];
  cartService = inject(ShoppingCartService);
  product: Product = {
    id: 1,
    name: 'Producto de ejemplo',
    description: 'Descripción del producto de ejemplo.',
    price: 29.99,
    image: 'producto.jpg',
    category: 'Electrónica',
    stock: 50,
    image1: 'imagen1.jpg',
    image2: 'imagen2.jpg',
    image3: 'imagen3.jpg',
    image4: 'imagen4.jpg',
    brand: 'Ejemplo Brand',
    rating: 4,
  };
  @Input() productName? : string;
  private productService = inject(ProductsServiceService);

  ngOnInit(): void {
    this.images = [
      'https://th.bing.com/th/id/OIP.QhBC1iv9OSV2tN2OFmGb2AHaEo?pid=ImgDet&rs=1',
      'https://wallpapercave.com/wp/wp9384511.jpg',
      'https://th.bing.com/th/id/OIP.myISToIroJNoSvTdnMTw2AHaEK?pid=ImgDet&rs=1',
      'https://i.pinimg.com/originals/dc/ce/1f/dcce1fdad76826f14218f7911b935dfd.jpg',
      'https://th.bing.com/th/id/R.e18ca28729c06f66612f04af40dbfba9?rik=J0psD%2bbcAAS%2fnw&pid=ImgRaw&r=0',
    ];

    this.productService.getProductByName(this.productName!).subscribe((res) => {
      this.product = res;
    })
    
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }
}
