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

  constructor(private accountService: AccountService, private jwtService: JwtService) {}

  ngOnInit(): void {
    this.accountId = this.jwtService.getAccountId(); // Get logged-in user's accountId

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
        this.shoppingCart = data;
        console.log('Shopping cart loaded:', this.shoppingCart);
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

}
