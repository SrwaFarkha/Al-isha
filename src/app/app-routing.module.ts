import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountComponent } from './account/account.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './guards/auth.guard';




const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect root URL to home
  
  { path: '', component: HomeComponent }, // Public Home Page
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },

  // Protected Routes (User must be logged in)
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },

  // Catch-all: Redirect unknown routes to home or login
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }