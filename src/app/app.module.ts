import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './account/login/login.component';
import { AccountService } from './_service/account.service';
import { ApiService } from './_service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsRoutingModule } from './products/products-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    FooterComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AccountService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }