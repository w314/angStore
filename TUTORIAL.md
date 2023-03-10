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

