import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



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



  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getAuthStatus() {
    return this.authStatus.asObservable(); // Allow components to listen for changes
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.authStatus.next(true); // Update authentication status
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authStatus.next(false); // Update authentication status
  }

}
