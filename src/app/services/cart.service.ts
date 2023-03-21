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
