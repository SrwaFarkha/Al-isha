import { Component, HostListener } from '@angular/core';
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
  selectedCategory: string= "Al-Isha";
  isFlexColumn = window.innerWidth > 770; // Initialize based on current width


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isFlexColumn = window.innerWidth > 770; // Update on resize
  }
  


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
   
    // if(category != "All")
    // {
    //   this.filteredData = this.productList.filter(item => item.categoryName == category.name);
    // }
    if (category === "All") {
      // If "All" is selected, show all products
      this.selectedCategory = "All Categories"; // Optional: Display a user-friendly name
    } else {
      // Filter products by the selected category
      this.filteredData = this.productList.filter(item => item.categoryName === category.name);
      this.selectedCategory = category.name; // Assign the selected category name to selectedCategory
    }    
  }

}
