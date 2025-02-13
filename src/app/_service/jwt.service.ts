import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 



@Injectable()
export class JwtService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());


  constructor(private router: Router){}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): any {
    return localStorage.getItem('authToken');
  }

  getAccountId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token); 
        return decoded.accountId || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }



  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.authStatus.next(true); 
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
  }

}
