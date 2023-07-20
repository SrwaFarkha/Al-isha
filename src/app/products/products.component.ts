import { Component } from '@angular/core';

import { ProductsService } from '../_service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products:any[] = [];


  constructor(protected productService: ProductsService){

    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });

  }


}
