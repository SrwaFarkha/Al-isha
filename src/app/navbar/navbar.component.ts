import { Component } from '@angular/core';
import { JwtService } from '../_service/jwt.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;


  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.jwtService.getToken(); // Check if token exists
  }
}
