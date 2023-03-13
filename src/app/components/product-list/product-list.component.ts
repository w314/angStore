import { Component, OnInit } from '@angular/core';
// import ProductService
import { ProductService } from 'src/app/services/product.service';
// import Product model
import { Product } from '../../models/Product'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
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
