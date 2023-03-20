// add Output, EventEmitter to imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.sass']
})
export class AddToCartComponent implements OnInit {
  // create quantity property
  quantity = 0
  // create updateQuantity event emitter that will pass data
  // to the parent component
  @Output() updateQuantity: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  // handle form submission
  submitForm() {
    // emit quantity information to parent component
    // when form is submitted
    this.updateQuantity.emit(this.quantity)
    // reset quantity to 0 on form
    this.quantity = 0
  }

}
