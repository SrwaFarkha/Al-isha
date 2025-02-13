import { Component } from '@angular/core';
import { JwtService } from 'src/app/_service/jwt.service';
import { AccountService } from 'src/app/_service/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  account: any; // Store account details



  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const accountId = this.jwtService.getAccountId();

    // if (accountId) {
    //   this.accountService.getAccountById(accountId).subscribe(
    //     (data) => (this.account = data),
    //     (error) => console.error('Error fetching account data:', error)
    //   );
    if (accountId) {
      this.accountService.getAccountById(accountId).subscribe(
        (data) => {
          console.log('Received account data:', data); 
          this.account = data;
        },
        (error) => console.error('Error fetching account data:', error)
      );
    }
  }
 

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login']);
  }
}
