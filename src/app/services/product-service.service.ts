import { Injectable } from '@angular/core';
// import Observables to create data stream compenets can subscribe to
import { Observable } from 'rxjs';
// import HttpClient to make http requests
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }

  // get data from web server, return a data stream of array of Products
  getProduct():<Observable<Product[]> {

  }
}
