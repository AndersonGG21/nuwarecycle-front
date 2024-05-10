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
        name: 'Gorra',
        description:
          'Azul tipo beisbolera, logo tejido blanco. Talla única',
        price: 20000,
        category: 'deportiva',
        stock: 0,
        image1: '/src/assets/images/ComponentOne.png',
        image2: '/src/assets/images//ComponentOne.png',
        image3: '',
        image4: '',
        brand: 'deportiva',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 3,
        name: 'Termo',
        description:
          'Termo Plástico con Tapa Manija. Apta para bebidas frias. Medidas 25cm x 7cms.',
        price: 9000,
        category: 'deportiva',
        stock: 20,
        image1: '/src/assets/images/componentTwo.png',
        image2: '/src/assets/images/componentTwo.png',
        image3: '/src/assets/images/componentTwo.png',
        image4: '/src/assets/images/componentTwo.png',
        brand: 'deportiva',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 4,
        name: 'Polo Blanco',
        description:
          'Polo blanco de hombre talla S, M, L, XL',
        price: 65000,
        category: 'deportiva',
        stock: 40,
        image1: '/src/assets/images/componentThree.png',
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
        name: 'Toalla Facial',
        description:
          'Toalla Facial Microfibra',
        price: 4800,
        category: 'deportiva',
        stock: 15,
        image1: '/src/assets/images/componentFour.png',
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
        name: 'Tula Deportiva',
        description:
          'Tula diseño deportivo en color azul. Cinta reflectiva de seguridad. Es impermeable.',
        price: 9750,
        category: 'deportiva',
        stock: 25,
        image1: '/src/assets/images/componentFive.png',
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
        name: 'Separador de Libros',
        description:
          'Trío separador de libros imantados Tamaño 4cm*4cm',
        price: 15000,
        category: 'cultura',
        stock: 35,
        image1: '/src/assets/images/componentSix.png',
        image2: '/src/assets/images/componentSix.png',
        image3: '/src/assets/images/componentSix.png',
        image4: '/src/assets/images/componentSix.png',
        brand: 'Apple',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 8,
        name: 'Pañitos Limpiadores',
        description:
          'Trío de pañitos en microfibra suave para limpieza de lentes y pantallas Tamaño 15cm*15cm Colección de arte SURA.',
        price: 18000,
        category: 'cultura',
        stock: 45,
        image1: '/src/assets/images/componentSeven.png',
        image2: '/src/assets/images/componentSeven.png',
        image3: '/src/assets/images/componentSeven.png',
        image4: '/src/assets/images/componentSeven.png',
        brand: 'Bose',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 9,
        name: 'Bolsa para Compras',
        description:
          'Bolsa para compras. Le llegará en cualquier diseño. Colección de Arte SURA',
        price: 23000,
        category: 'cultura',
        stock: 45,
        image1: '/src/assets/images/componentEight.png',
        image2: '/src/assets/images/componentEight.png',
        image3: '/src/assets/images/componentEight.png',
        image4: '/src/assets/images/componentEight.png',
        brand: 'GoPro',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 10,
        name: 'Libreta ecológica',
        description:
          'Libreta cultural, papel ecológico. Medidas 20cm * 10cm parte de la coleccion Sura',
        price:3000 ,
        category: 'cultura',
        stock: 22,
        image1: '/src/assets/images/componentNine.png',
        image2: '/src/assets/images/componentNine.png',
        image3: '/src/assets/images/componentNine.png',
        image4: '/src/assets/images/componentNine.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 11,
        name: 'Tigre peluche',
        description:
          'Muñeco en tela, hecho a mano. Medida 18 cm',
        price:30000 ,
        category: 'gifs',
        stock: 22,
        image1: '/src/assets/images/componentTen.png',
        image2: '/src/assets/images/componentTen.png',
        image3: '/src/assets/images/componentTen.png',
        image4: '/src/assets/images/componentTen.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      } ,
      {
        idProd: 12,
        name: 'Mascara Tigre Niño',
        description:
          'Tipo rompecabezas armable',
        price:20000 ,
        category: 'gifs',
        stock: 22,
        image1: '/src/assets/images/componentEleven.png',
        image2: '/src/assets/images/componentEleven.png',
        image3: '/src/assets/images/componentEleven.png',
        image4: '/src/assets/images/componentEleven.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      } ,
      {
        idProd: 13,
        name: 'Cojín Tigre Bot',
        description:
          'Cojín Tigre Bot - Material peluche.',
        price:19550 ,
        category: 'gifs',
        stock: 22,
        image1: '/src/assets/images/componentTwelve.png',
        image2: '/src/assets/images/componentTwelve.png',
        image3: '/src/assets/images/componentTwelve.png',
        image4: '/src/assets/images/componentTwelve.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      },
      {
        idProd: 14,
        name: 'Computador. Sin garantía',
        description:
          'Computador. Sin garantía de software y hardware. Una compra por año. Transporte lo asume el comprador.',
        price:100000 ,
        category: 'bodega y servicios',
        stock: 22,
        image1: '/src/assets/images/componentThirteen.png',
        image2: '/src/assets/images/componentThirteen.png',
        image3: '/src/assets/images/componentThirteen.png',
        image4: '/src/assets/images/componentThirteen.png',
        brand: 'Google',
        comments: [],
        image: '',
        rating: 0,
      } ,
      {
        idProd: 15,
        name: 'iPhone 13 Pro Max Extra',
        description:
          'Potente teléfono inteligente con cámara avanzada, procesador rápido y pantalla ProMotion.',
        price: 1099.0,
        category: 'tecnologia',
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
        idProd: 16,
        name: 'Dell XPS 13',
        description:
          'Portátil ultradelgado con pantalla InfinityEdge, procesador Intel Core i7 y SSD rápido.',
        price: 1299.0,
        category: 'tecnologia',
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
        idProd: 17,
        name: 'Sony WH-1000XM4',
        description:
          'Auriculares inalámbricos con cancelación de ruido adaptativa y calidad de sonido premium.',
        price: 349.0,
        category: 'tecnologia',
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
    ];
  }
}
