import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, Product } from '../type';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private PRODUCTS_API_URL = 'http://localhost:8080/api/v1/products';
  private LIKED_PRODUCTS_API_URL = 'http://localhost:8080/api/v1/likedProducts';
  private cookie = inject(CookieService);

  constructor(private http: HttpClient) {}

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.PRODUCTS_API_URL, newProduct);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_API_URL);
  }

  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_API_URL}/${name}`);
  }

  getProductsByBrands(brands: string[]): Observable<Product[]> {
    let params = new HttpParams();
    brands.forEach((brand) => {
      params = params.append('brands', brand);
    });

    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/brands`, {
      params: params,
    });
  }

  getProductsBetweenPrices(min: number, max: number): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('min', min);
    params = params.append('max', max);
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/price`, {
      params: params,
    });
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/category`, {
      params: params,
    });
  }

  getRadnomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/random`);
  }

  likeProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.LIKED_PRODUCTS_API_URL}`, product);
  }

  getLikedProducts(): Observable<Product[]> {
    const userId = this.cookie.get('uid');
    return this.http.get<Product[]>(`${this.LIKED_PRODUCTS_API_URL}/${userId}`);
  }

  getProductComments(produtId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.PRODUCTS_API_URL}/${produtId}/comments`
    );
  }

  commentProduct(produtId: number, comment: Comment): Observable<any> {
    return this.http.post<any>(
      `${this.PRODUCTS_API_URL}/${produtId}/comments`,
      comment
    );
  }

  deleteProductById(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.PRODUCTS_API_URL}/${id}`);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.PRODUCTS_API_URL}/${updatedProduct.idProd}`,
      updatedProduct
    );
  }

  getProductsJson(): Product[] {
    return [
      {
        idProd: 2,
        name: 'iPhone 13 Pro Max Extra',
        description:
          'Potente teléfono inteligente con cámara avanzada, procesador rápido y pantalla ProMotion.',
        price: 1099.0,
        category: 'SmartPhones',
        stock: 0,
        image1: '/src/assets/images/iphone13promax1.png',
        image2: '/src/assets/images//iphone13promax2.png',
        image3: '',
        image4: '',
        brand: 'Apple',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 3,
        name: 'Dell XPS 13',
        description:
          'Portátil ultradelgado con pantalla InfinityEdge, procesador Intel Core i7 y SSD rápido.',
        price: 1299.0,
        category: 'Laptops',
        stock: 20,
        image1: '/src/assets/images/Dell_XPS_13_1.png',
        image2: '/src/assets/images/Dell_XPS_13_2.png',
        image3: '/src/assets/images/Dell_XPS_13_3.png',
        image4: '/src/assets/images/Dell_XPS_13_4.png',
        brand: 'Dell',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 4,
        name: 'Sony WH-1000XM4',
        description:
          'Auriculares inalámbricos con cancelación de ruido adaptativa y calidad de sonido premium.',
        price: 349.0,
        category: 'Headphones',
        stock: 40,
        image1: '/src/assets/images/Sony%20WH-1000XM4_1.png',
        image2: '/src/assets/images/Sony%20WH-1000XM4_2.png',
        image3: '/src/assets/images/Sony%20WH-1000XM4_3.png',
        image4: '/src/assets/images/Sony%20WH-1000XM4_4.png',
        brand: 'Sony',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 5,
        name: 'Canon EOS R5',
        description:
          'Cámara mirrorless con sensor de alta resolución, grabación de video 8K y enfoque automático avanzado.',
        price: 3899.0,
        category: 'Cameras',
        stock: 15,
        image1: '/src/assets/images/Canon_EOS_R5_1.png',
        image2: '/src/assets/images/Canon_EOS_R5_2.png',
        image3: '/src/assets/images/Canon_EOS_R5_3.png',
        image4: '/src/assets/images/Canon_EOS_R5_4.png',
        brand: 'Canon',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 6,
        name: 'Nintendo Switch',
        description:
          'Consola de videojuegos híbrida para jugar en casa o en movimiento con juegos exclusivos.',
        price: 299.0,
        category: 'Gaming Consoles',
        stock: 25,
        image1: '/src/assets/images/Nintendo_Switch_1.png',
        image2: '/src/assets/images/Nintendo_Switch_2.png',
        image3: '/src/assets/images/Nintendo_Switch_3.png',
        image4: '/src/assets/images/Nintendo_Switch_4.png',
        brand: 'Nintendo',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 7,
        name: 'Apple Watch Series 7',
        description:
          'Smartwatch con pantalla siempre activa, seguimiento de la salud y diseño elegante.',
        price: 399.0,
        category: 'Wearable Tech',
        stock: 35,
        image1: '/src/assets/images/Apple_Watch_Series_7_1.png',
        image2: '/src/assets/images/Apple_Watch_Series_7_2.png',
        image3: '/src/assets/images/Apple_Watch_Series_7_3.png',
        image4: '/src/assets/images/Apple_Watch_Series_7_4.png',
        brand: 'Apple',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 8,
        name: 'Bose SoundLink Revolve',
        description:
          'Altavoz portátil con sonido envolvente, resistente al agua y batería de larga duración.',
        price: 199.0,
        category: 'Speakers',
        stock: 45,
        image1: '/src/assets/images/Bose_SoundLink_Revolve_1.png',
        image2: '/src/assets/images/Bose_SoundLink_Revolve_2.png',
        image3: '/src/assets/images/Bose_SoundLink_Revolve_3.png',
        image4: '/src/assets/images/Bose_SoundLink_Revolve_4.png',
        brand: 'Bose',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 9,
        name: 'GoPro HERO10 Black',
        description:
          'Cámara de acción con video 5.3K, estabilización HyperSmooth y resistencia al agua.',
        price: 499.0,
        category: 'Cameras',
        stock: 18,
        image1: '/src/assets/images/GoPro_HERO10_Black_1.png',
        image2: '/src/assets/images/GoPro_HERO10_Black_2.png',
        image3: '/src/assets/images/GoPro_HERO10_Black_3.png',
        image4: '/src/assets/images/GoPro_HERO10_Black_4.png',
        brand: 'GoPro',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 10,
        name: 'Google Nest Hub Max',
        description:
          'Pantalla inteligente con asistente virtual, cámara para videollamadas y control domótico.',
        price: 229.0,
        category: 'Smart Home',
        stock: 22,
        image1: '/src/assets/images/Google_Nest_Hub_Max_1.png',
        image2: '/src/assets/images/Google_Nest_Hub_Max_2.png',
        image3: '/src/assets/images/Google_Nest_Hub_Max_3.png',
        image4: '/src/assets/images/Google_Nest_Hub_Max_4.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      } 
    ];
  }
}
