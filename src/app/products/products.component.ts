import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductsService } from '../_service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productList:any;
  productCategories = [];
  filteredData: any;


  constructor(protected productService: ProductsService, private router: Router ){
    this.productService.getProducts().subscribe((result) => {
      this.productList = result;
      this.filteredData = result;
    });

    this.productService.getCategories().subscribe((result) => {
      this.productCategories = result;
    });

  }

  filterProductByCategory(category){
    
    this.filteredData = this.productList;
   
    if(category != "All")
    {
      this.filteredData = this.productList.filter(item => item.categoryName == category.name);

    }
    
  }

}
