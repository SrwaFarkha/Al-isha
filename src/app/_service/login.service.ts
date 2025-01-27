import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api : ApiService, private jwtService : JwtService) { }


    getToken(credentials: { email: string, password: string }): Observable<any> {
      return this.api.post('token', credentials)
  }
}
