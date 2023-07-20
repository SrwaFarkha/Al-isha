import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
// import { JwtService } from './jwt.service';
// import { LocalstoreService } from '../_shared/localstore.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api : ApiService) { }

      // POST /api/token (Generates a JWT for customer. Valid for 24 hours.)
    /**
     * Method to login.
     * @param userCredentials
     */
    getToken(userCredentials: string): Observable<any> {
      return this.api.post('token', userCredentials)
        .pipe(map(data => {
          if(data){
            // this.jwtService.saveToken(data)
          }
          return data;
        }))
    }

}