import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api : ApiService) { }


  getProducts(): Observable<any> {
    return this.api.get("product")
  }


}
