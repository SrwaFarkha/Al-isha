import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
  })

  export class ShoppingCartService {

    constructor(private api : ApiService) { }

         /**
   * Method to get the shopping cart by account ID.
   * @param accountId - The ID of the account
   */
  getShoppingCart(accountId: number): Observable<any> {
    return this.api.get(`shoppingcart/${accountId}`);
  }

  
   /**
   * Method to add a product to the shopping cart.
   * @param cartItem - The product details to add to the cart
   */
   addProductToCart(cartItem: any): Observable<any> {
    return this.api.post('shoppingcart/add', cartItem);
  }
  

  /**
   * Method to empty the shopping cart.
   * @param accountId - The ID of the account
   */
  emptyShoppingCart(accountId: number): Observable<any> {
    return this.api.post(`shoppingcart/${accountId}/empty`, {});
  }

  /**
   * Method to increase the quantity of a product in the cart.
   * @param accountId - The ID of the account
   * @param productId - The ID of the product
   */
  increaseCartProduct(accountId: number, productId: number, size: number): Observable<any> {
    return this.api.post(`shoppingcart/increase/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }

  /**
   * Method to decrease the quantity of a product in the cart.
   * @param accountId - The ID of the account
   * @param productId - The ID of the product
   */
  decreaseCartProduct(accountId: number, productId: number, size: number): Observable<any> {
    return this.api.post(`shoppingcart/decrease/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }

  /**
   * Method to delete a specific item from the shopping cart.
   * @param accountId - The ID of the account
   * @param productId - The ID of the product
   */
  deleteCartItem(accountId: number, productId: number, size: number): Observable<any> {
    return this.api.post(`shoppingcart/delete-cartitem/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }
  
  }  