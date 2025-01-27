import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable()
export class JwtService {

  constructor(private router: Router){}

  getToken(): any {
    return localStorage.getItem('authToken');
  }

  saveToken(token) {
    localStorage.setItem('authToken', token);

  }

  destroyToken() {
    localStorage.removeItem('authToken');
  }

  /* Clears all cookies and redirects user to login page (destructive!) */
  flushCookiesAndLeave = () => {
    this.destroyToken();
    this.router.navigate(['/home']);
  }

}
