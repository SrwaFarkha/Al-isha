import { Component } from '@angular/core';
import { JwtService } from 'src/app/_service/jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {



  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  logout() {
    this.jwtService.destroyToken(); // Remove token from storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
