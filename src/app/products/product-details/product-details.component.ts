import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, tap } from 'rxjs';
import { ProductsService } from 'src/app/_service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent {
  id: any;
  productId: number;
  product: any;
  

  constructor(protected productService: ProductsService, protected route: ActivatedRoute) {}
  
  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");

    this.route.params.pipe(map((params) => params["id"]), tap((id) => (this.productId = + id)))
    .subscribe((id) => {
      this.productId = id;
      this.getProduct(this.productId);
    })    
  }

  //api call
  getProduct(productId){
    this.productService.getProduct(productId).subscribe((result) => {
      this.product = result;
    });
  }
}

