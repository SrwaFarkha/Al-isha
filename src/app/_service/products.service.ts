import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api : ApiService) { }
//hämta alla produkter
  getProducts(): Observable<any> {
    return this.api.get("product")
  }

//hämta produkt via id
  getProduct(productId): Observable<any> {
    return this.api.get("product/" + productId)
  }


  getCategories(): Observable<any> {
    return this.api.get("product/category/get-categories")
  }

}
