import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import components
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  // path does not need to include starting /
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  // redirect root to products
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  // redirect all nonmatching routes to products
  // wild char route needs 2 stars **
  { path: '**', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
