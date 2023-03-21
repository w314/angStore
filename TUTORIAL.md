# Store Front Tutorial
How to build store front app

## Initate Angular App
create application
```bash
ng new angStore
```
- say YES to angular routing
- choose `SASS` as css

start application:
```bash
ng serve
```
It should display standard angular app front page.

Add remote git repository:
```bash
git remote add origin <remote_repository_url>
```
## Create Product Model
```bash
mkdir src/app/models
touch src/app/models/Product.ts
```
`src/app/models/Product.ts`:
```typescript
export class Product {
  id: number
  name: string
  categoryId: number
  description: string
  price: number
  url: string

  constructor() {
    this.id = 0
    this.name = ''
    this.categoryId = 0
    this.description = ''
    this.price = 0
    this.url = ''  
  }
}
```

## Get products from server
In lieu of server add `mock_products.json` to `src/assets`

```bash
touch src/assets/mock_products.json
```
```javascript
[{"id":6,"name":"Book","price":9.99,"url":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"You can read it!","category_id":1},
{"id":7,"name":"Headphones","price":249.99,"url":"https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Listen to stuff!","category_id":2},
{"id":8,"name":"Backpack","price":79.99,"url":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Carry things around town!","category_id":8},
{"id":9,"name":"Glasses","price":129.99,"url":"https://images.unsplashcom/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Now you can see!","category_id":8},
{"id":10,"name":"Cup","price":4.99,"url":"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Drink anything with it!","category_id":7},
{"id":11,"name":"Shirt","price":29.99,"url":"https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80","description":"Wear it with style!","category_id":3}
]
```
### Create ProductService:
```bash
mkdir src/app/services
ng g s services/Product
```
To be able to make http calls add edit `src/app/app.modul.ts`:
```typescript
// import HttpClientModule for making http requests
import { HttpClientModule } from '@angular/common/http'
    // ...
    imports: [
        HttpClientModule
    // ...
```
- import http client for making http requests
- add HttpClientModule to `@NgModule`'s `imports`

To fetch date from a server edit `src/app/services/product-service.ts`:
```typescript
// import Observables to create data stream compenets can subscribe to
import { Observable } from 'rxjs';
// import HttpClient to make http requests
import { HttpClient } from '@angular/common/http'
// import Product model
import { Product } from '../models/Product'

// ...

    // inject HttpClient dependency to constructor
    constructor(private htttp: httpClient){}

    // get data from web server
    // return a data stream of array of Products
    getProducts(): Observable<Product[]> {
      return this.http.get<[]>('./assets/mock_products.json')
    }
// ...
```

## Display Product List
Create ProductList component:
```bash
mkdir src/app/components
ng g c components/ProductList
```

Edit `src/app/components/product-list.component.ts`:
```typescript
// import ProductService
import { ProductService } from 'src/app/services/product.service';
// import Product model
import { Product } from '../../models/Product'

//...

export class ProductListComponent implements OnInit {

  // property to store products
  products: Product[] = [] 

  // inject ProductService into contructor
  constructor(private productService: ProductService) { }

  // on mount get products
  ngOnInit(): void {
    // to get products call productServices's getProducts() method
    // subscribe to the data stream returned
    this.productService.getProducts().subscribe(data => {
      // set products property to data received
      this.products = data
    })
  }
}
```

`src/app/components/product_list.component.html`:
```html
<!-- display product names -->
<ul>
  <!-- use the *ngFor directive to iterate through products-->
  <!-- use {{ }} interpolation to render the product name  -->
  <li *ngFor="let product of products">{{product.name}}</li>
</ul>
```

`src/app/app.component.html`:
```html
<app-product-list></app-product-list>
```

## Dipslay product in child component
Create child component:
```bash
ng g c components/Product
```
Edit `src/app/components/product/product.component.ts`:
```typescript
// add Input to imports to receive input from parent component
import { Component, OnInit, Input } from '@angular/core';
// import Product Model
import { Product } from '../../models/Product'

//...

export class ProductComponent implements OnInit {
  
  // declare product property
  // use @Input decorator to indicate data is provided by the parent component
  @Input() product: Product

  constructor() { 
    // initialize product property
    this.product = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      categoryId: 0,
      url: ''
    }
  }
//...
```
`src/app/components/product/product.component.html`:
```html
<!-- use {{ }} interpolation to display product name -->
<p>{{ product.name }}</p>
```
Edit `scr/app/components/product-list/product-list.component.html`:
```html
<!-- ... -->
  <li *ngFor="let product of products">
      <!-- use property binding [] = "" to bind
        <product in parent component to product in child component -->
      <app-product [product] ="product"></app-product>
  </li>
  <!-- ... -->
```

## Create Navigation with Product List and Cart
Create Cart component
```bash
ng g c components/cart
```
Create NavBar component
```
ng g c components/navBar
```
Add NavBar component to App component
Edit `src/app/app.component.html`:
```html
<app-nav-bar></app-nav-bar>
```

### Setup Router
Setup routes in `src/app/app-routing.module.ts`
```ts
//...
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
//...
```
`src/app/components/nav-bar/nav-bar.component/html`
```html
<nav>
  <ul>
    <!-- use routerLink instead of href -->
    <li><a routerLink="products">Products</a></li>
    <li><a routerLink="cart">Cart</a></li>
  </ul>
</nav>
```

Replace content of `src/app/app.component.html` with:
```html
<app-nav-bar></app-nav-bar>
<router-outlet></router-outlet>
```

## Add Form: addToCart
- It is going to be a `template driven form` (vs reactive form).
- We will use `two way binding` where the value of a form input in the view  is bound to a property in the component class. Data can be shared in both direction, we can read and write data.
- We will use the `@Output()` decorator and the `EventEmitter` to pass the data entered into the form to the parent component

Add `FormsModule` to `src/app/app.module.ts`:
- import
- add to imports array
```ts
// import for forms
import { FormsModule } from '@angular/forms';
//...
  imports: [
    FormsModule
//...
```

Create addToCart component
```bash
ng g c components/addToCart
```
Edit `src/app/components/add-to-cart/add-to-cart.component.ts`
```ts
//...
// add Output, EventEmitter to imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//...
  // create quantity property
  quantity = 0
  // create updateQuantity event emitter that will pass data
  // to the parent component
  @Output() updateQuantity: EventEmitter<number> = new EventEmitter()
//...
  // handle form submission
  submitForm() {
    // emit quantity information to parent component
    // when form is submitted
    this.updateQuantity.emit(this.quantity)
    // reset quantity to 0 on form
    this.quantity = 0
  }
}
```

Create form in `src/app/components/add-to-cart/add-to-cart.component.html`
```html
<!-- use event binding ()="" -->
<!-- to set form submit event to call the onSubmit method of the component class -->
<form (ngSubmit)="submitForm()">
  <!-- ngModel's use two way binding [(ngModel)]="propName" -->
  <!-- to bind the value of the input quantity input field -->
  <!-- to the  quantity property in the component class -->
  <input 
    type="number" 
    name="quantity"
    [(ngModel)]="quantity"
  >
  <button type="submit">Add To Cart</button>
</form>
```

Include addToCart component to ProductList component.
Edit `src/app/components/product-list/product-list.component.html`:
```html
<!-- ... -->
      <!-- use event binding ()="" to bind 
        updateQuntity() method of the current class component
        to be used when updateQuantity emitter of child component
        emits an event -->
      <app-add-to-cart (updateQuantity)="updateQuantity($event)"></app-add-to-cart>
<!-- ...  -->
```
Edit `src/app/components/product-list/product-list.component.ts`:
```ts
//...
  // create updateQuantity method to handle quantity updated
  updateQuantity(quantity:number) {
    console.log(`Quantity in product-list component: ${quantity}`)
  }
//...
```

## Make add to cart work on Products page
### Create Models
Create OrderItem model:
```bash
touch src/app/models/OrderItem.ts
```
`src/app/models/OrderItem.ts`:
```ts
export default interface OrderItem {
  productId: number,
  quantity: number
}
```
Create Order model:
```bash
touch src/app/models/Order.ts
```

`src/app/models/Order.ts`:
```ts
import OrderItem from "./OrderItem"

export default interface Order {
  items: OrderItem[]
  status: 'completed' | 'active'
}
```

### Create cart service
Generate service:
```bash
ng g s services/cart
```

`scr/app/services/cart.servie.ts`:
```ts
import { Injectable } from '@angular/core';
// import models
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // declare cart property
  cart: Order = {items: [] as OrderItem[], status: 'active'}

  constructor() {
  }

  getCart() {
    return this.cart
  } 

  updateCart(item: OrderItem) {
    this.cart.items.push(item)
  }
}
```

### Make addToCart button add product to cart
Edit `src/app/components/add-to-cart/add-to-cart.component.ts`:
```ts
// import models
import OrderItem from 'src/app/models/OrderItem';
//...
  // get productId from parent component
  @Input() productId: number = 0
//...
 // handle form submission
  submitForm() {
    // emit quantity and productId information to parent component
    // when form is submitted
    this.updateQuantity.emit({productId: this.productId, quantity: this.quantity})
    // reset quantity to 0 on form
    this.quantity = 0
  }
```

Edit `src/app/components/product-list/product-list.component.html`
Replace updateQuantity with updateCart:
```ts
//...
  // create updateCart method to handle quantity updated
  updateCart(item: OrderItem) {
    console.log(`In product-list component\nproduct id: ${item.productId}\nquantity: ${item.quantity}`)
    this.cartService.updateCart(item)
  }
//...
```

Edit `src/app/components/product-list/product-list.component.html`:
```html
<!-- 
- use event binding ()="" to bind 
  the updateQuantity emitter of the child component
  to the updateCart() method of the current class component
  to handle the information passed from child to parent
- use [] = "" property biding send productId information from parent to child 
  -->
<app-add-to-cart [productId]="product.id" (updateQuantity)="updateCart($event)"></app-add-to-cart>
```
