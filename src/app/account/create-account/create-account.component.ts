import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_service/account.service'; // Import service
import { Router } from '@angular/router';
import { JwtService } from 'src/app/_service/jwt.service';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  createAccountForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private jwtService: JwtService
  ) {
    this.createAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postNumber: ['', Validators.required],
      streetAddress: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const accountData = {
        firstName: this.createAccountForm.value.firstName,
        lastName: this.createAccountForm.value.lastName,
        email: this.createAccountForm.value.email,
        phoneNumber: this.createAccountForm.value.phoneNumber,
        password: this.createAccountForm.value.password,
        createdOn: new Date().toISOString(),
        address: {
          country: this.createAccountForm.value.country,
          city: this.createAccountForm.value.city,
          postNumber: this.createAccountForm.value.postNumber,
          streetAddress: this.createAccountForm.value.streetAddress
        }
      };
  
      console.log('Sending mapped account data:', accountData);
  
      this.accountService.createAccount(accountData).subscribe({
        next: (response) => {       
          if (response.token) {
            this.jwtService.saveToken(response.token);  
          }   
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating account:', err);
        }
      });
    } else {
      console.warn('Form is invalid:', this.createAccountForm.errors);
    }
  } 
}
