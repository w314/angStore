import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import for forms
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import HttpClientModule for making http requests
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    NavBarComponent,
    AddToCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
