import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { MediaService } from 'src/app/services/media.service';
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
  newProduct: Product = {
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
  private alertService = inject(AlertService);
  private mediaService = inject(MediaService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product) {
    this.productDialog = true;
    this.product = product;
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductById(productId).subscribe({
      next: (res) => {
        this.alertService.success('Product deleted successfully');
        this.products = this.products.filter(
          (product) => product.idProd !== productId
        );
      },
      error: (error) => {
        console.error('Error al crear el producto', error);
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe({
      next: (res) => {        
        this.alertService.success('Product updated successfully');
      },
      complete: () => {   
        this.productDialog = false;             
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
  }

  saveProduct() {
    console.log(this.newProduct);
    this.productService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.newProductDialog = false;
        this.alertService.success('Product added successfully');        
        this.newProduct = {
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
      },
      error: (error) => {
        console.error('Error al crear el producto', error);
      },
      complete: () => {
        location.reload();
      }
    });
  }

  confirmImages() {
    const imagesLength = this.imagesFormData.getAll('file').length;
    const pImages: string[] = [];
    this.imagesFormData.forEach((element) => {
      const formData = new FormData();

      formData.append('file', element);
      this.mediaService.uploadFile(formData).subscribe((res) => {
        pImages.push(res.url);

        if (pImages.length === imagesLength) {
          this.newProduct.image1 = pImages[0];
          this.newProduct.image2 = pImages[1];
          this.newProduct.image3 = pImages[2];
          this.newProduct.image4 = pImages[3];
        }
      });
    });
    console.log(this.newProduct);
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
