import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: any = null; // Keep it as `any` if you want simplicity, or create an interface like `ShoppingCartDto`
  accountId: number = 1; // Static for now; replace with dynamic logic as needed

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadShoppingCart();
  }

  loadShoppingCart(): void {
    this.accountService.getShoppingCart(this.accountId).subscribe({
      next: (data) => {
        this.shoppingCart = data;
        console.log('Shopping cart loaded:', this.shoppingCart);
      },
      error: (err) => {
        console.error('Error loading shopping cart:', err);
      }
    });
  }

  addProductToCart(productId: number, size: string, quantity: number): void {
    const cartItem = {
      accountId: this.accountId,
      productId,
      size,
      quantity
    };

    this.accountService.addProductToCart(cartItem).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.loadShoppingCart(); // Refresh shopping cart
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
      }
    });
  }
}
