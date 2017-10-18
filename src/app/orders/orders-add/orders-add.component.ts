import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GetMockService } from '../../shared/services/get-mock.service';
import { GetDateService } from '../../shared/services/get-date.service';
import { Broadcaster } from '../../shared/services/broadcaster';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css']
})
export class OrdersAddComponent implements OnInit {
  form: FormGroup
  @Input() usersList

  constructor(
    private formBuilder: FormBuilder,
    private getMockService: GetMockService,
    private getDateService: GetDateService,
    private broadcaster: Broadcaster
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: ['johny'],
      product: ['games'],
      quantity: [null, [Validators.required, Validators.pattern('[ˆ0-9]+')]]
    })
  }

  CSSInvalidField(field) {
    return {'is-invalid': this.isInvalid(field)}
  }

  isInvalid(field) {
    return !this.form.get(field).valid && this.form.get(field).touched
  }

  newOrder() {
    if (this.form.valid) {
      const price = (this.form.get('product').value === 'books')
      ? 29.9
      : (this.form.get('product').value === 'games' ? 300 : 11200)
      const body = [
        {
          "user": String(this.form.get('user').value),
          "product": String(this.form.get('product').value),
          "date": this.getDateService.today().todayUTC,
          "price": price,
          "quantity": Number(this.form.get('quantity').value)
        }
      ]
      const newJSON = this.usersList.concat(body)
      this.getMockService.putOrder(newJSON).subscribe(data => {
        this.broadcaster.broadcast('updatedOrderList', newJSON)
      })
    } else {
      return
    }
  }

}
