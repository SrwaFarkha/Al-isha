import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';
import { JwtService } from 'src/app/_service/jwt.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: any = [];
  accountId: number | null = null;

  sizeMap = {
    0: 'XS',
    1: 'S',
    2: 'M',
    3: 'L',
  };
  constructor(private accountService: AccountService, private jwtService: JwtService) {}

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

    this.accountService.getShoppingCart(this.accountId).subscribe({
      next: (data) => {
        if (data && data.products) {
          this.shoppingCart = data.products; 
          console.log('Shopping cart loaded:', this.shoppingCart);
        } else {
          this.shoppingCart = [];
        }
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  increaseQuantity(productId: number, size: number): void {
    console.log('Increasing quantity for product:', productId, 'Size:', size); 
    if (this.accountId !== null) {
      this.accountService.increaseCartProduct(this.accountId, productId, size).subscribe({
        next: (response) => {
          console.log('API Response:', response);  
          const cartItem = this.shoppingCart.find(item => item.productId === productId && item.size === size);
          if (cartItem) {
            cartItem.quantity++;
          }
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
      this.accountService.decreaseCartProduct(this.accountId, productId, size).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          const cartItem = this.shoppingCart.find(item => item.productId === productId && item.size === size);
          if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity--;
          }
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

    this.accountService.deleteCartItem(this.accountId, productId, size).subscribe({
      next: (response) => {
        console.log('Cart item removed:', response);
        this.loadShoppingCart();  
      },
      error: (err) => console.error('Error deleting cart item:', err)
    });
  }

}
