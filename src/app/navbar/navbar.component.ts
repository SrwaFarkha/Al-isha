import { Component } from '@angular/core';
import { JwtService } from '../_service/jwt.service';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;


  constructor(private jwtService: JwtService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoggedIn = !!this.jwtService.getToken(); 
    this.cdRef.detectChanges(); // Force update

  }
}
