import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Broadcaster } from '../../shared/services/broadcaster';
import { GetMockService } from '../../shared/services/get-mock.service';

declare const $;

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit {
  @Input() user
  @Input() usersList
  product: string
  editForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private broadcaster: Broadcaster,
    private getMockService: GetMockService
  ) { }

  ngOnInit() {
    this.getOrderInfo()
    this.patchOrder(this.user)
    this.product = this.user.product
    this.broadcaster.on('editUser').subscribe(data => {
      this.patchOrder(data)
    })
    $('.modal').modal('show')
  }

  getOrderInfo() {
    this.editForm = this.formBuilder.group({
      user: [null],
      product: [null],
      date: [null],
      price: [null],
      quantity: [null, [Validators.required, Validators.pattern('[ˆ0-9]+')]]
    })
  }

  patchOrder(data) {
    this.editForm.patchValue({
      user: [data.user],
      product: [data.product],
      date: [data.date],
      price: [data.price],
      quantity: [data.quantity]
    })
  }

  CSSInvalidField(field) {
    return {'is-invalid': this.isInvalid(field)}
  }

  isInvalid(field) {
    return !this.editForm.get(field).valid && this.editForm.get(field).touched
  }

  onChange(e) {
    const price = (e === 'books')
      ? 29.9
      : (e === 'games' ? 300 : 11200)
    this.editForm.patchValue({
      price: [price]
    })
  }

  save(user) {
    const body = {
      "user": String(this.editForm.get('user').value),
      "product": String(this.editForm.get('product').value),
      "date": String(this.editForm.get('date').value),
      "price": Number(this.editForm.get('price').value),
      "quantity": Number(this.editForm.get('quantity').value)
    }
    if (this.editForm.valid) {
      this.usersList.map((usr, index) => {
        if(usr === user) {
          this.usersList[index] = body
        }
      })
      this.getMockService.putOrder(this.usersList).subscribe()
    }
  }

}
