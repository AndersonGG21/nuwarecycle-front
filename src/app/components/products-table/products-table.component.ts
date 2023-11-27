import { Component, OnInit, inject } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];
  product: Product = {
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
  productDialog: boolean = false;
  private productService = inject(ProductsServiceService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    })
  }

  editProduct(product : Product) {
    this.productDialog = true;
    this.product = product;
    console.log('edit');
  }

  deleteProduct(product : Product) {
    console.log('delete');
  }

  hideDialog() {
    this.productDialog = false;
  }

  saveProduct() {
    console.log('save');
  }
}
