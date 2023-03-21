import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Order
 from 'src/app/models/Order';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  
  cart: Order = {} as Order

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart()
    console.log(this.cart)
  }

}
