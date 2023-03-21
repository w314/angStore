import { Component, OnInit } from '@angular/core';
// import ProductService
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
// import Product model
import { Product } from '../../models/Product'
import OrderItem from 'src/app/models/OrderItem';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  // property to store products
  products: Product[] = [] 

  // inject ProductService into contructor
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  // on mount get products
  ngOnInit(): void {
    // to get products call productServices's getProducts() method
    // subscribe to the data stream returned
    this.productService.getProducts().subscribe(data => {
      // set products property to data received
      this.products = data
    })
  }

  // create updateQuantity method to handle quantity updated
  updateCart(item: OrderItem) {
    console.log(`In product-list component\nproduct id: ${item.productId}\nquantity: ${item.quantity}`)
    this.cartService.updateCart(item)
  }

  
}
