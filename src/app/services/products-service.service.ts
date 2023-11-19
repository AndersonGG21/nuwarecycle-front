import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../type';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private PRODUCTS_API_URL = "http://localhost:8080/api/v1/products";
  private cookie = inject(CookieService);
  
  constructor(private http: HttpClient) { }
  


  
  getAllProducts() : Observable<Product[]> {
    //const headers = new HttpHeaders().set('Authorization', `${this.cookie.get('Bearer')}}`);
    return this.http.get<Product[]>(this.PRODUCTS_API_URL);
  }

  getProductByName(name: string) : Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_API_URL}/${name}`);
  }

}
