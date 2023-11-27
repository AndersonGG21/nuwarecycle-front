import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Product } from 'src/app/type';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  @ViewChild('pImagesInput') fileInput!: ElementRef;
  products: Product[] = [];
  selectedProducts: Product[] = [];
  selectedCategory: any = null;
  productDialog = false;
  newProductDialog = false;
  categories: string[] = [
    'Computers',
    'SmartPhones',
    'Headphones',
    'Gaming Consoles',
    'Cameras',
    'Televisions',
    'Wearable Tech',
    'Laptops',
    'Speakers',
    'Smart Home',
  ];
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
    rating: 0,
  };
  private productService = inject(ProductsServiceService);
  imagesFormData = new FormData();
  imagesThumbnails: string[] = [];
  alertService = inject(AlertService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product) {
    this.productDialog = true;
    this.product = product;
    console.log('edit');
  }

  deleteProduct(product: Product) {
    console.log('delete');
  }

  hideDialog() {
    this.productDialog = false;
  }

  saveProduct() {
    console.log('save');
  }

  handleFileInputChange(event: Event) {
    this.imagesThumbnails = [];
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files) {
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        this.imagesFormData.append('file', files[index]);
        reader.onload = (e) =>
          this.imagesThumbnails.push(e.target?.result as string);
        reader.readAsDataURL(files[index]);
      }
    }
  }
}
