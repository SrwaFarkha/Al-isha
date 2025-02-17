import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, tap } from 'rxjs';
import { ProductsService } from 'src/app/_service/products.service';
import { JwtService } from 'src/app/_service/jwt.service';
import { AccountService } from 'src/app/_service/account.service';


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
  selectedSize: string | null = null;
  // addProductToShoppingCart: any;
  showSizeNotification: boolean = false; 
  showAddedNotification: boolean = false;
  filteredData:any;
  productList:any;
  @Input() any; 
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

  constructor(
    protected productService: ProductsService, 
    protected route: ActivatedRoute, 
    private accountService: AccountService,
    private jwtService: JwtService
  ) {
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
  
    
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');

    this.productService.getProduct(this.productId).subscribe((product) => {
      this.productDetails = product;
    });
  }
  
  
    handleSizeSelection(size: number): void {
      this.selectedSize = this.sizeMap[size];
      this.showSizeNotification = false; 
      console.log(`Selected size: ${size}`);
    }
    

    addProductToCart(): void {
      if (!this.selectedSize) {
        this.showSizeNotification = true;
        this.showAddedNotification = false; 
        console.log('Please select a size first.');
        return;
      }
    
      const accountId = this.jwtService.getAccountId();
      if (!accountId) {
        console.error('User not logged in');
        return;
      }

        const sizeEnumMap: { [key: string]: number } = {
          XS: 0,
          S: 1,
          M: 2,
          L: 3,
        };

        const sizeEnumValue = sizeEnumMap[this.selectedSize];

        if (sizeEnumValue === undefined) {
          console.error('Invalid size selected.');
          return;
        }
    
      const cartItem = {
        AccountId: accountId, 
        productId: this.product?.productId,
        productName: this.product?.productName,
        price: this.product?.price,
        size: sizeEnumValue, 
        quantity: 1, 
      };
    
      this.accountService.addProductToCart(cartItem).subscribe({
        next: () => {
          this.showSizeNotification = false;
          this.showAddedNotification = true;
          console.log(`Product added to cart: ${cartItem.productName}, Size (Enum): ${cartItem.size}`);
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
    
    }

  changeMainImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }


  getProduct(productId:string){
    this.productService.getProduct(productId).subscribe((result) => {
      this.product = result;
      this.selectedImage = this.product?.images?.[0]?.url || ''; 
    },
    (error) => {
      console.error('Failed to fetch product details', error);
    });
  }
}

