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
 * Method to fetch account details by accountId
 * @param accountId - The ID of the account
 */
getAccountById(accountId: number): Observable<any> {
  return this.api.get(`account/${accountId}`);
}


}

