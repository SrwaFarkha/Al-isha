import { Component, OnInit, Input } from '@angular/core';
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
  productId: string;
  productDetails: any;
  product: any = null;
  selectedSize: string | null = null; // To store the selected size
  addProductToShoppingCart: any;
  showSizeNotification: boolean = false; // To manage size selection notification
  showAddedNotification: boolean = false; // Notification for added to cart
  filteredData:any;
  productList:any;
  @Input() any; // Assume product is passed as input
  selectedImage: string;



  descriptionFields = [
    { label: 'Materials', key: 'material' },
    { label: 'Fabric', key: 'fabric' },
    { label: 'Our Model', key: 'ourModel' },
    { label: 'Model Size', key: 'modelSize' }
  ];

  productInfoFields = [
    { label: 'Color', key: 'color' },
    { label: 'Fit', key: 'fit' },
    { label: 'Arm', key: 'arm' },
    { label: 'Length', key: 'lenght' },
    { label: 'Zipper', key: 'zipper' },
    { label: 'Article Numbers', key: 'articleNumber' }
  ];

  careAndAdviceFields = [
    { label: 'Advice', key: 'careAdvice' }
  ];

  sizeMap = {
    0: 'XS',
    1: 'S',
    2: 'M',
    3: 'L',
  };

  constructor(protected productService: ProductsService, protected route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const productId = params['productId'];
      this.productService.getProduct(productId).subscribe((result) => {
        this.productList = result;
        this.filteredData = result;
        this.product = result;

        this.selectedImage = result?.images?.[0]?.url || '';
        console.log(this.filteredData);
      });
    });
  }
  
  

    // Handle the selection of a size
    handleSizeSelection(size: number): void {
      this.selectedSize = this.sizeMap[size]; // Convert integer to string size
      this.showSizeNotification = false; // Hide notification if a size is selected
      console.log(`Selected size: ${size}`);
    }
    

    // addProductToCart(): void {
    //   if (!this.selectedSize) {
    //     this.showSizeNotification = true; // Show notification if no size is selected
    //     console.log('Please select a size first.');
    //     return;
    //   }

    // // Logic to add product to the cart
    // this.showAddedNotification = true; // Show added notification
    // console.log(`Product added to cart: ${this.product?.productName}, Size: ${this.selectedSize}`);
  
    // }

    addProductToCart(): void {
      if (!this.selectedSize) {
        // Show notification if no size is selected
        this.showSizeNotification = true;
        this.showAddedNotification = false; // Ensure other notifications are hidden
        console.log('Please select a size first.');
        return;
      }
    
      // Example logic for adding the product to the cart
      const cartItem = {
        productId: this.product?.productId,
        productName: this.product?.productName,
        price: this.product?.price,
        size: this.selectedSize,
        quantity: 1, // Default quantity; you can customize this
      };
    
      // Here, you would call a service method to add the product to the backend cart
      this.addProductToShoppingCart.addToCart(cartItem).subscribe({
        next: () => {
          this.showSizeNotification = false; // Hide size notification
          this.showAddedNotification = true; // Show added notification
          console.log(`Product added to cart: ${cartItem.productName}, Size: ${cartItem.size}`);
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
    }
    


  // Method to change the main image
  changeMainImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');

    // Fetch product details using the productId
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.productDetails = product;
    });
  }

  //api call
  getProduct(productId:string){
    this.productService.getProduct(productId).subscribe((result) => {
      this.product = result;
      this.selectedImage = this.product?.images?.[0]?.url || ''; // Initialize the main image
    },
    (error) => {
      console.error('Failed to fetch product details', error);
    
    });


  }

}

