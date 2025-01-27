import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/_service/jwt.service';
import { LoginService } from 'src/app/_service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private jwtService: JwtService
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
        this.loginService.getToken(this.loginForm.value).subscribe({
          next: (response: any) => {
            if(response){
              const token = response.token; 
              this.jwtService.saveToken(token);

              this.router.navigate(['/account']);
            }
          },
        });
    } else {
      console.log('Form is invalid:', this.loginForm.errors);
    }
  }
}