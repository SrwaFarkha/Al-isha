import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api : ApiService) { }


  // Function to create account (sends POST request)
  createAccount(account: any): Observable<any> {
    return this.api.post('account',account);
  }

      /**
   * Method to get the shopping cart by account ID.
   * @param accountId - The ID of the account
   */
  getShoppingCart(accountId: number): Observable<any> {
    return this.api.get(`account/shoppingcart/${accountId}`);
  }

   /**
   * Method to add a product to the shopping cart.
   * @param cartItem - The product details to add to the cart
   */
  addProductToCart(cartItem: any): Observable<any> {
    return this.api.post('account/shoppingcart/add', cartItem);
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
    return this.api.post(`account/shoppingcart/increase/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }

  /**
   * Method to decrease the quantity of a product in the cart.
   * @param accountId - The ID of the account
   * @param productId - The ID of the product
   */
  decreaseCartProduct(accountId: number, productId: number, size: number): Observable<any> {
    return this.api.post(`account/shoppingcart/decrease/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }

  /**
   * Method to delete a specific item from the shopping cart.
   * @param accountId - The ID of the account
   * @param productId - The ID of the product
   */
  deleteCartItem(accountId: number, productId: number, size: number): Observable<any> {
    return this.api.post(`account/shoppingcart/delete-cartitem/${accountId}/${productId}/${size}`, {}, { responseType: 'text' });
  }

/**
 * Method to fetch account details by accountId
 * @param accountId - The ID of the account
 */
getAccountById(accountId: number): Observable<any> {
  return this.api.get(`account/${accountId}`);
}


}

