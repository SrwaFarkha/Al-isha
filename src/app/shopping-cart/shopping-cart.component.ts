import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/_service/shopping-cart.service';
import { JwtService } from 'src/app/_service/jwt.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: any = [];
  shoppingCartTotalPrice: number = 0;

  accountId: number | null = null;

  sizeMap = {
    0: 'XS',
    1: 'S',
    2: 'M',
    3: 'L',
  };
  constructor(private shoppingCartService: ShoppingCartService, private jwtService: JwtService) {}

  ngOnInit(): void {
    this.accountId = this.jwtService.getAccountId();

    if (this.accountId !== null) {
      this.loadShoppingCart();
    } else {
      console.error('No valid account ID found. User might not be logged in.');
    }
  }

  loadShoppingCart(): void {
    if (!this.accountId) return;

    this.shoppingCartService.getShoppingCart(this.accountId).subscribe({
      next: (data) => {
        if (data && data.products) {
          this.shoppingCart = data.products; 
          this.shoppingCartTotalPrice = data.shoppingCartTotalPrice;
          console.log('Shopping cart loaded:', this.shoppingCart);
          console.log('Total Price:', this.shoppingCartTotalPrice);

        } else {
          this.shoppingCart = [];
          this.shoppingCartTotalPrice = 0;

        }
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  increaseQuantity(productId: number, size: number): void {
    console.log('Increasing quantity for product:', productId, 'Size:', size); 
    if (this.accountId !== null) {
      this.shoppingCartService.increaseCartProduct(this.accountId, productId, size).subscribe({
        next: (response) => {
          this.loadShoppingCart();
        },
        error: (err) => {
          console.error('Error increasing quantity:', err);
          alert('Error increasing quantity');
        }
      });
    }
  }
  
  decreaseQuantity(productId: number, size: number): void {
    console.log('Decreasing quantity for product:', productId, 'Size:', size);
    if (this.accountId !== null) {
      this.shoppingCartService.decreaseCartProduct(this.accountId, productId, size).subscribe({
        next: (response) => {
          this.loadShoppingCart();
        },
        error: (err) => {
          console.error('Error decreasing quantity:', err); 
          alert('Error decreasing quantity');
        }
      });
    }
  }

  deleteCartItem(productId: number, size: number): void {
    if (!this.accountId) return;

    this.shoppingCartService.deleteCartItem(this.accountId, productId, size).subscribe({
      next: (response) => {
        console.log('Cart item removed:', response);
        this.loadShoppingCart();  
      },
      error: (err) => console.error('Error deleting cart item:', err)
    });
  }

}
