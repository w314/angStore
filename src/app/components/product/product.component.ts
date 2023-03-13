// add Input to imports to receive input from parent component
import { Component, OnInit, Input } from '@angular/core';
// import Product Model
import { Product } from '../../models/Product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
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

  ngOnInit(): void {
  }

}
