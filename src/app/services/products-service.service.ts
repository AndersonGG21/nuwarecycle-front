import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../type';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private PRODUCTS_API_URL = "http://localhost:8080/api/v1/products";
  private LIKED_PRODUCTS_API_URL = "http://localhost:8080/api/v1/likedProducts";
  private cookie = inject(CookieService);
  
  constructor(private http: HttpClient) { }
  
  getAllProducts() : Observable<Product[]> {  
    return this.http.get<Product[]>(this.PRODUCTS_API_URL);
  }

  getProductByName(name: string) : Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_API_URL}/${name}`);
  }

  getProductsByBrands(brands: string[]) : Observable<Product[]> {
    let params = new HttpParams();
    brands.forEach(brand => {
      params = params.append('brands', brand);
    });

    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/brands` , { params: params });
  }

  getProductsBetweenPrices(min: number, max: number) : Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('min', min);
    params = params.append('max', max);
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/price`, { params: params });
  }

  getProductsByCategory(category: string) : Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/category`, { params: params });
  }

  getRadnomProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}/random`);
  }

  likeProduct(product: any) : Observable<any> {
    return this.http.post<any>(`${this.LIKED_PRODUCTS_API_URL}`, product);
  }

  getLikedProducts() : Observable<Product[]> {
    const userId = this.cookie.get('uid');
    return this.http.get<Product[]>(`${this.LIKED_PRODUCTS_API_URL}/${userId}`);
  }

}
