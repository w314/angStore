// add Output, EventEmitter to imports
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
// import models
import OrderItem from 'src/app/models/OrderItem';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.sass']
})

export class AddToCartComponent implements OnInit {
  // create quantity property
  quantity = 0
  // get productId from parent component
  @Input() productId: number = 0
  // create updateQuantity event emitter that will pass data
  // to the parent component
  @Output() updateQuantity: EventEmitter<OrderItem> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  // handle form submission
  submitForm() {
    // emit quantity and productId information to parent component
    // when form is submitted
    this.updateQuantity.emit({productId: this.productId, quantity: this.quantity})
    // reset quantity to 0 on form
    this.quantity = 0
  }

}
