import { Injectable } from '@angular/core';
// import HttpClientModule for making http requests
import { HttpClient } from '@angular/common/http';
// import Observables to create data stream compenets can subscribe to
import { Observable } from 'rxjs';
// import Product Module
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // inject HttpClient dependency to constructor
  constructor(private http: HttpClient) { }

  // get data from web server
  // return a data stream of array of Products
  getProducts(): Observable<Product[]> {
    return this.http.get<[]>('./assets/mock_products.json')
    // return this.http.get<[]>('http://localhost:3001/products')
  }
}
