import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private PRODUCTS_API_URL = "http://localhost:8080/ap1/v1/products";
  
  constructor(private http: HttpClient) { }

  
  getAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_API_URL);
  }

  getProductByName(name: string) : Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_API_URL + "/" + name);
  }

}
